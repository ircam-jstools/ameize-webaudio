import AudioNode from './AudioNode';
import AudioParam from './AudioParam';

class GainNode extends AudioNode {
  constructor(audioContext) {
    super(audioContext, {});

    this._patch = this._audioContext._openPatch('ameize-gain.pd');

    this.gain = new AudioParam(this, 'gain');
  }
}

export default GainNode;
