import AudioScheduledSourceNode from './AudioScheduledSourceNode';
import AudioParam from './AudioParam';

class OscillatorNode extends AudioScheduledSourceNode {
  constructor(audioContext) {
    super(audioContext, {
      numberOfInputs: 0,
    });

    this._patch = this._audioContext._openPatch('ameize-oscillator.pd');

    this.frequency = new AudioParam(this, 'frequency');
  }
}

export default OscillatorNode;
