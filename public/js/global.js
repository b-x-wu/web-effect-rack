$(document).ready(() => {
	openPd();
	$('#buttonOsc').on('click', handleClickOsc);
	$('#buttonAdc').on('click', handleClickAdc);

	$('#buttonAddDelay').on('click', handleAddDelay);
	$('#buttonAddBp').on('click', handleAddBp);
	$('#buttonAddNoise').on('click', handleAddNoise);

	$('#buttonEffectRack').on('click', handleEffectRack);
	$('#buttonClearEffectRack').on('click', clearEffectRack);
	$('#inputGain').on('change', handleGainChange);
})

function openPd() {
	// activate Pd no matter which button is pressed
	var	buttonOsc = document.getElementById("buttonOsc");
	Pd.startOnClick(buttonOsc, () => {
		console.log("pd ready");
	});

	var buttonAdc = document.getElementById("buttonAdc");
	Pd.startOnClick(buttonAdc, () => {
		console.log("pd ready");
	});

	var buttonEffectsRack = document.getElementById("buttonEffectRack");
	Pd.startOnClick(buttonEffectsRack, () => {
		console.log("pd ready");
	});

	// create the effect rack patch
	effectRackPatch = Pd.createPatch();
	adcEffectRack = effectRackPatch.createObject('adc~');
	gainEffectRack = effectRackPatch.createObject('*~', [1]);
	dacEffectRack = effectRackPatch.createObject('dac~');
	gainEffectRack.o(0).connect(dacEffectRack.i(0));
	gainEffectRack.o(0).connect(dacEffectRack.i(1));
}
