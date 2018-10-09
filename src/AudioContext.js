import path from 'path';
import pd from 'node-libpd';
import { Scheduler } from 'waves-masters';
import AudioDestinationNode from './AudioDestinationNode';
import AudioNode from './AudioNode';
import AudioParam from './AudioParam';

import OscillatorNode from './OscillatorNode';
import GainNode from './GainNode';

const patchesPath = path.join(process.cwd(), 'pd');

/** @private */
class Connection {
  constructor(audioContext, source, destination) {
    this.audioContext = audioContext;
    this.source = source;
    this.destination = destination;
    this._patch = this.audioContext._openPatch('ameize-connection.pd');

    const channel = `${this._patch.$0}-connect`;
    let args;

    if (destination instanceof AudioNode) {
      args = [`${source._patch.$0}-output-0` , `${destination._patch.$0}-input-0`];
    } else if (destination instanceof AudioParam) {
      args = [`${source._patch.$0}-output-0` , `${destination._parent._patch.$0}-${destination._name}-audio`];
    }

    this.audioContext._pd.send(channel, args);
  }

  delete() {
    // close patch
    this.audioContext._pd.closePatch(this._patch);
    // clean references
    this.audioContext = null;
    this.source = null;
    this.destination = null;
  }
}

/**
 * https://webaudio.github.io/web-audio-api/#AudioContext
 */
class AudioContext {
  constructor() {
    this._pd = pd;
    this._connections = [];
    // init pd
    const initialized = this._pd.init({
      // use the same parameters as the audio driver, including the number of channels
      numInputChannels: 0,
      numOutputChannels: 1,
      sampleRate: 44100,
      ticks: 1,
    });

    if (!initialized) {
      throw new Error('An error occured while instanciating libpd');
    }

    // instanciate destination
    this.destination = new AudioDestinationNode(this);
    this._scheduler = new Scheduler(() => {
      return pd.currentTime;
    });
  }

  get currentTime() {
    return this._pd.currentTime;
  }

  /** @private */
  _openPatch(patchName) {
    const patch = this._pd.openPatch(patchName, patchesPath);

    if (!patch.isValid) {
      throw new Error(`Cannot open invalid patch: ${patch}`);
    } else {
      return patch;
    }
  }

  /** @private */
  _connect(source, destination) {
    if (destination instanceof AudioNode || destination instanceof AudioParam) {
      const index = this._connections.findIndex(c => c.source === source && c.destination === destination)

      if (index === -1) {
        const connection = new Connection(this, source, destination);
        this._connections.push(connection);
      }
    } else {
      throw new TypeError(`Failed to execute 'connect' on 'AudioNode': No function was found that matched the signature provided.`);
    }
  }

  /** @private */
  _disconnect(source, destination = null) {
    if (destination instanceof AudioParam || destination instanceof AudioNode) {
      // delete related connection
    } else {
      // delete all connected related to the source
    }
  }

  // @todo
  resume() {
    return Promise.resolve();
  }

  // @todo
  supend() {

  }

  close() {
    this._pd.clear();
  }

  createOscillator() {
    return new OscillatorNode(this);
  }

  createGain() {
    return new GainNode(this);
  }
}

export default AudioContext;
