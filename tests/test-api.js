import AudioContext from '../src/AudioContext';
import * as masters from 'waves-masters'

const audioContext = new AudioContext();


// AM, FM, scheduling, linearRamp

// const scheduler = new masters.Scheduler(() => {
//   return audioContext.currentTime;
// });

// class Engine extends masters.TimeEngine {
//   constructor() {
//     super();

//     const ramp = audioContext.createGain();
//     ramp.gain.value = 0;
//     ramp.connect(audioContext.destination);

//     const env = audioContext.createGain();
//     env.gain.value = 0.7;
//     env.connect(ramp);

//     const osc = audioContext.createOscillator();
//     osc.frequency.value = 400;
//     osc.connect(env);

//     // AM
//     const modAmpScale = audioContext.createGain();
//     modAmpScale.gain.value = 0.3;
//     modAmpScale.connect(env.gain);

//     const modAmp = audioContext.createOscillator();
//     modAmp.frequency.value = 25;
//     modAmp.connect(modAmpScale);

//     // FM
//     const modFreq = audioContext.createOscillator();
//     modFreq.frequency.value = 40;
//     modFreq.connect(osc.frequency);

//     osc.start(0);
//     modAmp.start(0);
//     modFreq.start(0);

//     this.ramp = ramp;
//     this.period = 1;
//   }

//   advanceTime(time) {

//     // problems w/ ramps
//     const now = time;
//     this.ramp.gain.setValueAtTime(0, now);
//     this.ramp.gain.linearRampToValueAtTime(1, now + 0.01);
//     this.ramp.gain.exponentialRampToValueAtTime(0.001, now + 1);

//     return time + this.period;
//   }
// }

// const engine = new Engine();
// scheduler.add(engine);

// start / stop
// const osc = audioContext.createOscillator();
// osc.connect(audioContext.destination);
// const now = audioContext.currentTime;
// osc.frequency.setValueAtTime(220, now);

// osc.start(now + 2);
// osc.stop(now + 4);

// endedsource
(function() {
  const osc = audioContext.createOscillator();
  const now = audioContext.currentTime;
  osc.connect(audioContext.destination);
  osc.start(now);
  // osc.stop(now + 2);
  // osc.frequency.setValueAtTime(440, now);
  // osc.frequency.exponentialRampToValueAtTime(880, now + 5);
}());
























