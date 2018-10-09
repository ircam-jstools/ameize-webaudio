import AudioNode from './AudioNode';

class AudioDestinationNode extends AudioNode {
  constructor(audioContext, options) {
    super(audioContext, {
      numberOfInputs: 1,
      numberOfOutputs: 0,
    });

    this._patch = this._audioContext._openPatch('ameize-output.pd');
  }
}

export default AudioDestinationNode;
