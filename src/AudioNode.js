
/**
 * https://dom.spec.whatwg.org/#eventtarget
 */
class EventTarget {
  constructor() {

  }
}

//
/**
 * https://webaudio.github.io/web-audio-api/#audionode
 */
class AudioNode extends EventTarget {
  constructor(audioContext, {
    numberOfInputs = 1,
    numberOfOutputs = 1,
    channelCount = null,
    channelCountMode = null,
    channelInterpretation = null,
  } = {}) {
    super();

    this.numberOfInputs = numberOfInputs;
    this.numberOfOutputs = numberOfOutputs;
    this.channelCount = channelCount;
    this.channelCountMode = channelCountMode;
    this.channelInterpretation = channelInterpretation;

    this._audioContext = audioContext;
    this._patch = null; // instance of the pd patch
    this._connections = new Set();
  }

  /**
   * https://webaudio.github.io/web-audio-api/#dom-audionode-connect
   * @note: we only deal with mono for now so no need for that.
   */
  connect(destination/*, output, input */) {
    this._audioContext._connect(this, destination);
  }

  /**
   * https://webaudio.github.io/web-audio-api/#dom-audionode-disconnect
   * @note: we only deal with mono for now so no need for that.
   */
  disconnect(destination = null /*, output */) {
    this._audioContext._disconnect(this, destination);
  }
}

export default AudioNode;
