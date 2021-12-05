$(document).ready(() => {
	openPd();
	$('#buttonOsc').on('click', handleClickOsc);
	$('#buttonAdc').on('click', handleClickAdc);
});

function openPd() {
	var	buttonOsc = document.getElementById("buttonOsc");
	Pd.startOnClick(buttonOsc, () => {
		console.log("pd ready");
	});

	var buttonAdc = document.getElementById("buttonAdc");
	Pd.startOnClick(buttonAdc, () => {
		console.log("pd ready");
	});
}

var oscOn = false;
var adcOn = false;
var oscPatch;
var adcPatch;

function handleClickOsc(event) {
	event.preventDefault();
	if (oscOn) {
		stopOsc();
	} else {
		startOsc();
	}
	oscOn = !oscOn;
}

function startOsc() {
	// parse freq
	var freq;
	if ($('#inputFreq').val() === '') {
		freq = 440;
		$('#inputFreq').val('440');
	} else {
		freq = parseInt($('#inputFreq').val());
	}

	// create patch with objects
	oscPatch = Pd.createPatch();
	var osc = oscPatch.createObject('osc~', [freq]);
	var dac = oscPatch.createObject('dac~');
	osc.o(0).connect(dac.i(0));
	osc.o(0).connect(dac.i(1));

	// change start to stop
	$('#buttonOsc').html("Stop");
}

function stopOsc() {
	Pd.destroyPatch(oscPatch);
	$('#buttonOsc').html("Start");
	$('#inputFreq').val('');
}

function handleClickAdc() {
	event.preventDefault();
	if (adcOn) {
		stopAdc();
	} else {
		startAdc();
	}
	adcOn = !adcOn;
}

function startAdc() {
	$.get('patches/adcTest.pd', (patchStr) => {
		adcPatch = Pd.loadPatch(patchStr);
		$('#buttonAdc').html("Stop");
	})
}

function stopAdc() {
	Pd.destroyPatch(adcPatch);
	$('#buttonAdc').html("Start");
}
