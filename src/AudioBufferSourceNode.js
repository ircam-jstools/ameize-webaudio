import AudioScheduledSourceNode from './AudioScheduledSourceNode';
import AudioParam from './AudioParam';

class AudioBufferSourceNode extends AudioScheduledSourceNode {
  constructor(audioContext) {
    super(audioContext);

    this._patch = this._audioContext._openPatch('ameize-buffer-source.pd');

    this.playbackRate = new AudioParam(this, 'playbackRate');
    this.detune = new AudioParam(this, 'detune');

    this._buffer = null;
  }

  set buffer(buffer) {
    this._buffer = buffer;
    this._audioContext._pd.send(`${this._patch.$0}-buffer`, `${buffer._patch.$0}-buffer`);
  }
}

export default AudioBufferSourceNode;
