$(document).ready(() => {
	openPd();
	$('#buttonAddDelay').on('click', handleAddDelay);
	$('#buttonAddBp').on('click', handleAddBp);
	$('#buttonAddNoise').on('click', handleAddNoise);

	$('#buttonEffectRack').on('click', handleEffectRack);
	$('#buttonClearEffectRack').on('click', clearEffectRack);
	$('#inputGain').on('change', handleGainChange);
});

function openPd() {
	const buttonEffectsRack = document.getElementById("buttonEffectRack");
	Pd.startOnClick(buttonEffectsRack, () => {
		console.log("pd ready");
	});

	effectRackPatch = Pd.createPatch();
	adcEffectRack = effectRackPatch.createObject('adc~');
	gainEffectRack = effectRackPatch.createObject('*~', [1]);
	dacEffectRack = effectRackPatch.createObject('dac~');
	gainEffectRack.o(0).connect(dacEffectRack.i(0));
	gainEffectRack.o(0).connect(dacEffectRack.i(1));

}
