// hold button
let oscButton1 = document.getElementById('oscButton1');
let oscButton2 = document.getElementById('oscButton2');

// wave select
let selectOsc1 = document.getElementById('selectOsc1');
let selectOsc2 = document.getElementById('selectOsc2');

//range inputs
let oscFreq1 = document.getElementById('oscFreq1');
let oscFreq2 = document.getElementById('oscFreq2');
let filterFreq1 = document.getElementById('filterFreq1');
let filterFreq2 = document.getElementById('filterFreq2');
let filterQ1 = document.getElementById('filterQ1');
let filterQ2 = document.getElementById('filterQ2');
let faderVol1 = document.getElementById('faderVol1');
let faderVol2 = document.getElementById('faderVol2');
let masterFader = document.getElementById('masterFader');

// print details element
let printOsc1 = document.getElementById('printOsc1');
let printOsc2 = document.getElementById('printOsc2');


// Web Audio Context, Oscillators, Filters, and Gain
window.AudioContext = window.AudioContext || window.webkitAudioContext;
let audioCtx = new window.AudioContext();
let osc1 = audioCtx.createOscillator();
let osc2 = audioCtx.createOscillator();
let filter1 = audioCtx.createBiquadFilter();
let filter2 = audioCtx.createBiquadFilter();
let fader1 = audioCtx.createGain();
let fader2 = audioCtx.createGain();
let master = audioCtx.createGain();

console.log(`AudioContext\n`, audioCtx);
console.log(`Oscillator\n`, osc1);
console.log(`Gain\n`, fader1);
console.log(`Filter\n`, filter1);

/// start and stop oscillator

function activateListeners(osc, filter, fader, button, keyDown, selectOsc, oscFreq, filterFreq, filterQ, faderVol, printOsc) {

    osc.type = 'sine';
    osc.frequency.value = 440;

    filter.type = "lowpass";
    filter.frequency.value = 1000;
    osc.start(0);

    master.gain.value = 4;

    filter.connect(fader);
    fader.connect(master)
    master.connect(audioCtx.destination);

    function oscStart() {
        button.innerHTML = "stop";
        osc.connect(filter);
    }

    function oscStop() {
        button.innerHTML = "start";
        osc.disconnect(filter);
    }

    // start+stop osc on mousedown (hold)
    button.addEventListener('mousedown', ()=>{
        if(button.innerHTML==="start"){
            oscStart();
        } else if(button.innerHTML==="stop"){
            oscStop();
        }
    });


    // start + stop osc with keydown event
    document.addEventListener('keydown', (e)=>{
        if(e.keyCode===keyDown) oscStart();
    });

    document.addEventListener('keyup', (e) => {
        if(e.keyCode===keyDown) oscStop();
    });


    // determines frequency of oscillator based on selection
    selectOsc.addEventListener('change', () => {
        for (let i = 0; i < selectOsc.children.length; i++) {
            if (selectOsc.children[i].checked) {
                osc.type = selectOsc.children[i].value;
            }
        }
    });

    /// oscillator frequency input
    oscFreq.addEventListener('input', ()=>{
        printOsc.innerHTML = `<p><strong>Osc Freq:</strong> ${oscFreq.value}hz</p>`;
        osc.frequency.value = oscFreq.value;
    });

    /// filter cutoff
    filterFreq.addEventListener('input', ()=>{
        printOsc.innerHTML = `<p><strong>Filter Freq:</strong> ${filterFreq.value}hz</p>`;
        filter.frequency.value = filterFreq.value;
    });

    /// filter Q
    filterQ.addEventListener('input', () => {
        printOsc.innerHTML = `<p><strong>Filter Q:</strong> ${filterQ.value}</p>`;
        filter.Q.value = filterQ.value;
    });

    // oscillator fader
    faderVol.addEventListener('input', () => {
        fader.gain.value = faderVol.value;
    });

}


masterFader.addEventListener('input', () => {
    master.gain.value = masterFader.value;
});


activateListeners(osc1, filter1, fader1, oscButton1, 83, selectOsc1, oscFreq1, filterFreq1, filterQ1, faderVol1, printOsc1);
activateListeners(osc2, filter2, fader2, oscButton2, 68, selectOsc2, oscFreq2, filterFreq2, filterQ2, faderVol2, printOsc2);

