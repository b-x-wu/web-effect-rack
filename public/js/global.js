$(document).ready(() => {
	openPd();
	$('#buttonOsc').on('click', handleClickOsc);
	$('#buttonAdc').on('click', handleClickAdc);

	$('#buttonAddDelay').on('click', handleAddDelay);
	$('#buttonAddBp').on('click', handleAddBp)

	$('#buttonEffectRack').on('click', handleEffectRack)
	$('#buttonClearEffectRack').on('click', clearEffectRack);
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

	// register abstractions
	$.get('patches/delayAbs~.pd', (delayPatchStr) => {
		Pd.registerAbstraction('delayAbs~', delayPatchStr);
	});

	$.get('patches/bpAbs~.pd', (bpPatchStr) => {
		Pd.registerAbstraction('bpAbs~', bpPatchStr);
	});

	// create the effect rack patch
	effectRackPatch = Pd.createPatch();
	adcEffectRack = effectRackPatch.createObject('adc~');
	dacEffectRack = effectRackPatch.createObject('dac~');
}
