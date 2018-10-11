import AudioNode from './AudioNode';

const noop = () => {};

/**
 * cf. https://webaudio.github.io/web-audio-api/#AudioScheduledSourceNode
 */
class AudioScheduledSourceNode extends AudioNode {
  constructor(audioContext) {
    super(audioContext, {
      numberOfInputs: 0
    });

    this.onended = noop;
    this._onended = this._onended.bind(this);
    this._events = [];

    this._startCalled = false;
    this._stopCalled = false;
  }

  /**
   * @private
   * scheduled interface
   */
  advanceTime(time) {
    const event = this._events.shift();
    const channel = `${this._patch.$0}-${event.type}`;

    this._audioContext._pd.send(channel, true, time);

    const nextEvent = this._events[0];

    if (nextEvent) { // start event and stop already register
      return nextEvent.time;
    } else { // remove from scheduler
      return null;
    }
  }

  /** @private */
  _onended() {
    this._audioContext._pd.unsubscribe(`${this._patch.$0}-ended`, this._onended);

    this._audioContext._disconnect(this);
    // clear connections
    this._audioContext._clearScheduledSourcePointer(this);

    this.onended();
  }

  start(time) {
    if (this._startCalled || this._stopCalled) {
      throw InvalidStateError('Cannot call "start" twice on the same AudioScheduledSourceNode');
    }

    this._startCalled = true;

    const event = {
      time: time,
      type: 'start',
    };

    this._events.push(event);

    this._audioContext._addScheduledSourcePointer(this);
    this._audioContext._scheduler.add(this, time);
    this._audioContext._pd.subscribe(`${this._patch.$0}-ended`, this._onended);
  }

  stop(time) {
    if (!this._startCalled) {
      throw InvalidStateError('Cannot call "stop" before "start"');
    }

    if (this._events[0] && this._events[0].time > time) {
      throw InvalidStateError('Cannot call "stop" before "start"');
    }

    this._stopCalled = true;

    const event = {
      time: time,
      type: 'stop',
    };

    this._events.push(event);

    // start event has already been executed
    if (this._events.length === 0) {
      this._audioContext._scheduler.add(this, time);
    }
  }
}

export default AudioScheduledSourceNode;
