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

    // ////// noise

    // this.noise = pd.openPatch('ameize-noise.pd', patchesPath);

    // this.output = pd.openPatch('ameize-output.pd', patchesPath);

    // connection = pd.openPatch('ameize-connection.pd', patchesPath);
    // this.noise.connections = [];
    // this.noise.connections.push(connection);
    // pd.send(connection.$0 + '-connect', [this.noise.$0 + '-output-0' , this.output.$0 + '-input-0']);

    // ////// noise and gain

    // this.output = pd.openPatch('ameize-output.pd', patchesPath);

    // this.noiseGain = pd.openPatch('ameize-gain.pd', patchesPath);
    // pd.send(this.noiseGain.$0 + '-gain-control', ['setValue', 0.]);
    // connection = pd.openPatch('ameize-connection.pd', patchesPath);
    // this.noiseGain.connections = [];
    // this.noiseGain.connections.push(connection);
    // pd.send(connection.$0 + '-connect', [this.noiseGain.$0 + '-output-0' , this.output.$0 + '-input-0']);

    // this.noise = pd.openPatch('ameize-noise.pd', patchesPath);
    // connection = pd.openPatch('ameize-connection.pd', patchesPath);
    // this.noise.connections = [];
    // this.noise.connections.push(connection);
    // pd.send(connection.$0 + '-connect', [this.noise.$0 + '-output-0' , this.noiseGain.$0 + '-input-0']);

    // ////// oscillator

    // this.carrier = pd.openPatch('ameize-oscillator.pd', patchesPath);
    // pd.send(this.carrier.$0 + '-frequency', 300);

    // this.output = pd.openPatch('ameize-output.pd', patchesPath);

    // connection = pd.openPatch('ameize-connection.pd', patchesPath);
    // this.carrier.connections = [];
    // this.carrier.connections.push(connection);
    // pd.send(connection.$0 + '-connect', [this.carrier.$0 + '-output-0' , this.output.$0 + '-input-0']);


    // gain modulation

    this.output = pd.openPatch('ameize-output.pd', patchesPath);

    this.noiseGain = pd.openPatch('ameize-gain.pd', patchesPath);
    connection = pd.openPatch('ameize-connection.pd', patchesPath);
    this.noiseGain.connections = [];
    this.noiseGain.connections.push(connection);
    pd.send(connection.$0 + '-connect', [this.noiseGain.$0 + '-output-0' , this.output.$0 + '-input-0']);

    this.noiseModulation = pd.openPatch('ameize-oscillator.pd', patchesPath);
    pd.send(this.noiseModulation.$0 + '-frequency-control', ['setValue', 2]);
    connection = pd.openPatch('ameize-connection.pd', patchesPath);
    this.noiseModulation.connections = [];
    this.noiseModulation.connections.push(connection);
    pd.send(connection.$0 + '-connect', [this.noiseModulation.$0 + '-output-0' , this.noiseGain.$0 + '-gain-audio']);
    pd.send(this.noiseGain.$0 + '-gain-audio-connected', 1);

    this.noise = pd.openPatch('ameize-noise.pd', patchesPath);
    connection = pd.openPatch('ameize-connection.pd', patchesPath);
    this.noise.connections = [];
    this.noise.connections.push(connection);
    pd.send(connection.$0 + '-connect', [this.noise.$0 + '-output-0' , this.noiseGain.$0 + '-input-0']);

    this.period = 1.;
    this.toggle = 0;
  }

  advanceTime(time) {
    this.toggle ^= 1;

    // pd.send(this.noiseGain.$0 + '-gain-control', ['linearRampToValue', this.toggle * 0.1, 1000. * this.period / 2.]);

    if(this.toggle) {
      // const frequency = Math.random() * 4;
      // pd.send(this.noiseModulation.$0 + '-frequency-control', ['setValue', frequency]);
    } else  {
      const frequency = Math.random() * 10.;
      pd.send(this.noiseModulation.$0 + '-frequency-control', ['setValue', frequency]);

      // @fixme
      // pd.send(this.noiseModulation.$0 + '-frequency-control', ['linearRampTovalue', frequency, 1000. * this.period]);
    }

    return time + this.period;
  }
}

const pdEngine = new PdEngine();
scheduler.add(pdEngine);

// pd.send(patch.$0 + '-trigger');
