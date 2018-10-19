import AudioBuffer from './AudioBuffer';
import pd from 'node-libpd'; // singleton

class AudioBufferLoader {
  constructor() {
    this._loadOne = this._loadOne.bind(this);
  }

  _loadOne(path) {
    return new Promise((resolve, reject) => {
      const audioBuffer = new AudioBuffer(path);

      pd.subscribe(`${audioBuffer._patch.$0}-ready`, () => {
        resolve(audioBuffer);
      });
    });
  }

  load(paths) {
    if (!Array.isArray(paths)) {
      return this._loadOne(paths);
    } else {
      const promises = paths.map(this._loadOne);
      return Promise.all(promises);
    }
  }
}

export default AudioBufferLoader;
