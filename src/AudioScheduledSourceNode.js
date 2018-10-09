import AudioNode from './AudioNode';

// ScheduledAudioNode

/**
 * cf. https://webaudio.github.io/web-audio-api/#AudioScheduledSourceNode
 */
class AudioScheduledSourceNode extends AudioNode {
  constructor(audioContext) {
    super(audioContext, {
      numberOfInputs: 0
    });

    this.onended = () => {};
  }

  start(time) {
    // @todo
  }

  stop(time) {
    // @todo
  }
}

export default AudioScheduledSourceNode;
