window.AudioContext = window.AudioContext || window.webkitAudioContext;





let audioCtx = new window.AudioContext();
let squareWave = audioCtx.createOscillator();
let gain = audioCtx.createGain();

let filter = audioCtx.createBiquadFilter();

squareWave.type = 'square';  
squareWave.frequency.value = 440;
squareWave.start(0);

filter.frequency.value = 4000;
filter.Q.value = 1;
filter.gain.value = 1;

squareWave.connect(filter);
filter.connect(gain);
gain.connect(audioCtx.destination);






squareWave.connect(audioCtx.destination);
///   ---- or, with a GainNode ----    ///


