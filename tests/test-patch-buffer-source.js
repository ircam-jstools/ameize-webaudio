import path from 'path';
import pd from 'node-libpd';
import * as masters from 'waves-masters';
import Blocked from '@ircam/blocked';

const blocked = new Blocked( (duration) => {
  console.log(`+++++++++++ Blocked for ${duration} ms +++++++++++++++`);
}, 10);

// debug
const SegfaultHandler = require('segfault-handler');
SegfaultHandler.registerHandler("crash.log");

const patchesPath = path.join(process.cwd(), 'pd');
console.log(patchesPath);

/**
 * list methods
 */
{
  console.log('************************************************');
  console.log('* API *');
  for (let i in pd)
    console.log(`- ${i}`);
  console.log('************************************************');
}

/**
 * Start worker thread, launch pd and portaudio
 * @todo - fix the race condition between the js and the worker thread
 */
const initialized = pd.init({
  // use the same parameters as the audio driver, including the number of channels
  numInputChannels: 0,
  numOutputChannels: 1,
  sampleRate: 44100,
  ticks: 1,
});

console.log('');
console.log('[pd initialized]', initialized);
console.log('');

const scheduler = new masters.Scheduler(() => {
  return pd.currentTime;
});


class PdEngine extends masters.TimeEngine {
  constructor() {
    super();

    let connection;

    ////// debug

    this.debug = pd.openPatch('ameize-debug-activate.pd', patchesPath);

    this.output = pd.openPatch('ameize-output.pd', patchesPath);

    this.bufferSource = pd.openPatch('ameize-buffer-source.pd', patchesPath);
    connection = pd.openPatch('ameize-connection.pd', patchesPath);
    this.bufferSource.connections = [];
    this.bufferSource.connections.push(connection);
    pd.send(connection.$0 + '-connect', [this.bufferSource.$0 + '-output-0' , this.output.$0 + '-input-0']);

    this.buffer = pd.openPatch('ameize-buffer.pd', patchesPath);
    pd.send(this.buffer.$0 + '-read', 'violin.wav');
    pd.send(this.bufferSource.$0 + '-buffer', this.buffer.$0 + '-buffer');

    pd.send(this.bufferSource.$0 + '-loop', 1);
    pd.send(this.bufferSource.$0 + '-loopStart', 0.5);
    // pd.send(this.bufferSource.$0 + '-loopEnd', 2);
    // pd.send(this.bufferSource.$0 + '-loopEnd', -1);
    pd.send(this.bufferSource.$0 + '-playbackRate-control', ['setValue', 0.9]);

    this.period = 2.;
    this.toggle = 0;

    this.once = true;
  }

  advanceTime(time) {
    if(this.once) {
      this.once = false;
      // wait for buffer to read file
      pd.send(this.bufferSource.$0 + '-start');
    }


    this.toggle ^= 1;
    // const variation = 0.1 * (this.toggle * 2 - 1);

    // pd.send(this.bufferSource.$0 + '-playbackRate-control', ['linearRampToValue', 1 + variation, 0.01]);

    return time + this.period;
  }
}

const pdEngine = new PdEngine();
scheduler.add(pdEngine);

// pd.send(patch.$0 + '-trigger');
