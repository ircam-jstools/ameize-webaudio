import path from 'path';
import pd from 'node-libpd'; // singleton

const patchesPath = path.join(__dirname, '..', 'pd');

class AudioBuffer {
  constructor(path) {
    this._patch = pd.openPatch('ameize-buffer.pd', patchesPath);
    pd.send(`${this._patch.$0}-read`, path);

    this.sampleRate;
    this.duration;

  }

}

export default AudioBuffer;
