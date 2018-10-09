import { TimeEngine } from 'waves-masters';


class AudioParam extends TimeEngine {
  constructor(parent, name) {
    super();

    this._parent = parent;
    this._name = name;

    // attribute float value;
    // attribute AutomationRate automationRate;
    // readonly attribute float defaultValue;
    // readonly attribute float minValue;
    // readonly attribute float maxValue;

    this._controlChannel = `${this._parent._patch.$0}-${this._name}-control`;
    this._eventCounter = 0;
    this._events = [];

    this._parent._audioContext._scheduler.add(this);
  }

  /** @private */
  _registerEvent(event) {
    event.id = this._eventCounter += 1;

    this._events.push(event);
    this._events.sort((a, b) => {
      if (a.time < b.time) {
        return -1;
      } else if (a.time > b.time) {
        return 1;
      } else {
        return a.id < b.id ? -1 : 1;
      }
    });

    if (this._events[0] === event) {
      this.resetTime(event.time);
    }
  }

  /**
   * @private
   * waves-masters scheduled interface
   */
  advanceTime(time) {
    const event = this._events.shift();

    if (event.type === 'cancel') {
      this._events.length = 0; // clear queue
    }

    this._parent._audioContext._pd.send(this._controlChannel, event.args, time);

    if (this._events.length > 0) {
      return this._events[0].time;
    } else {
      return Infinity;
    }
  }

  get value() {
    return null;
  }

  set value(value) {
    if (value === null)
      return;

    const event = {
      time: this._parent._audioContext._pd.currentTime,
      args: ['setValue', value],
    };

    this._registerEvent(event);
  }

  setValueAtTime(value, time) {
    const event = {
      time: time,
      args: ['setValue', value],
    };

    this._registerEvent(event);
  }

  cancelAndHoldAtTime(cancelTime) {
    const event = {
      time: cancelTime,
      args: ['cancel'],
    };

    this._registerEvent(event);
  }

  // keep
  cancelScheduledValues(cancelTime) {
    const event = {
      time: cancelTime,
      args: ['cancel'],
    };

    this._registerEvent(event);
  }

  linearRampToValueAtTime(value, endTime) {
    let time;

    if (this._events.length > 0) {
      const lastEvent = this._events[this._events.length - 1];
      const eventType = lastEvent.args[0];

      switch (eventType) {
        case 'linearRampToValue':
        case 'exponentialRampToValue':
          time = lastEvent.time + lastEvent.args[2];
          break;
        default:
          time = lastEvent.time;
          break;
      }
    } else {
      time = this._parent._audioContext._pd.currentTime;
    }

    const duration = endTime - time;

    if (duration > 0) {
      const event = {
        time: time,
        args: ['linearRampToValue', value, duration],
      };

      this._registerEvent(event);
    }
  }

  exponentialRampToValueAtTime(value, endTime) {
    console.error('to be implemented');
  }

  setTargetAtTime(target, startTime, timeConstant) {
    console.error('to be implemented');
  }

  setValueCurveAtTime(values, startTime, duration) {
    console.error('to be implemented');
  }

}

export default AudioParam;
