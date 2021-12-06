// DELAY

function handleAddDelay(event) {
	event.preventDefault();

	var delayTime = parseInt($('#inputDelayDelayTime').val());
	var feedbackGain = parseInt($('#inputDelayFeedbackGain').val());
	
	$.get('patches/delayAbs~.pd', (delayPatchStr) => {
		var index = effectRack.length;

		// add delay patch to effectRack
		disconnectObjects();
		Pd.registerAbstraction('delayAbs~', delayPatchStr);
		effectRack.push(effectRackPatch.createObject('delayAbs~', [delayTime, feedbackGain]));
		if (effectRackOn) {connectObjects()};

		var delayDiv = effectDiv(index, "delay", {"delayTime" : ["Delay Time", delayTime, 0, 1000], "feedbackGain" : ["Feedback Gain", feedbackGain, 0, 100]});
		$('#effectRack').append(delayDiv);

		// clear input fields
		$('#inputDelayDelayTime').val('');
		$('#inputDelayFeedbackGain').val('');

		// listen for events on new elements
		$('.effectChange').off();
		$('.effectChange').on('change', handleEffectChange);
		$('.deleteButton').off();
		$('.deleteButton').on('click', handleEffectDelete);

	});
}

function handleDelayChange(event, index) {
	// change patch object
	var argsNodeList = event.currentTarget.parentElement.parentElement.parentElement.getElementsByTagName("input");
	var args = Array.from(argsNodeList).map(node => parseInt(node.value));
	effectRack[index].i(1).message([args[0]]);
	effectRack[index].i(2).message([args[1]]);

	// change output value
	for (let i = 0; i < args.length; i++) {
		event.currentTarget.parentElement.parentElement.parentElement.getElementsByTagName('output')[i].innerHTML = String(args[i]);
	}

}

// BP

function handleAddBp(event) {
	event.preventDefault();

	var cutoff = parseInt($('#inputBpCutoff').val());
	var q = parseInt($('#inputBpQ').val());

	$.get('patches/bpAbs~.pd', (bpPatchStr) => {
		var index = effectRack.length;

		disconnectObjects();
		Pd.registerAbstraction('bpAbs~', bpPatchStr);
		effectRack.push(effectRackPatch.createObject('bpAbs~', [cutoff, q]));
		if (effectRackOn) {connectObjects()};

		var bpDiv = effectDiv(index, "bp", {"cutoff" : ["Cutoff", cutoff, 0, 500], "q" : ["Q", q, 0, 100]});
		$('#effectRack').append(bpDiv);

		$('#inputBpCutoff').val('');
		$('#inputBpQ').val('');

		$('.effectChange').off();
		$('.effectChange').on('change', handleEffectChange);
		$('.deleteButton').off();
		$('.deleteButton').on('click', handleEffectDelete);
	});
}

function handleBpChange(event, index) {
	var argsNodeList = event.currentTarget.parentElement.parentElement.parentElement.getElementsByTagName("input");
	var args = Array.from(argsNodeList).map(node => parseInt(node.value));
	console.log(argsNodeList)
	effectRack[index].i(1).message([args[0]]);
	effectRack[index].i(2).message([args[1]]);

	for (let i = 0; i < args.length; i++) {
		event.currentTarget.parentElement.parentElement.parentElement.getElementsByTagName('output')[i].innerHTML = String(args[i]);
	}
}

// NOISE

function handleAddNoise(event) {
	event.preventDefault();

	var level = parseFloat($('#inputNoiseLevel').val());

	$.get('patches/noiseAbs~.pd', (noisePatchStr) => {
		var index = effectRack.length;

		disconnectObjects();
		Pd.registerAbstraction('noiseAbs~', noisePatchStr);
		effectRack.push(effectRackPatch.createObject('noiseAbs~', [level]));
		if (effectRackOn) {connectObjects()};

		var noiseDiv = effectDiv(index, "noise", {"level" : ["Level", level, 0, 100]});
		$('#effectRack').append(noiseDiv);

		$('#inputNoiseLevel').val('');

		$('.effectChange').off();
		$('.effectChange').on('change', handleEffectChange);
		$('.deleteButton').off();
		$('.deleteButton').on('click', handleEffectDelete);
	});
}

function handleNoiseChange(event, index) {
	var argsNodeList = event.currentTarget.parentElement.parentElement.parentElement.getElementsByTagName("input");
	var args = Array.from(argsNodeList).map(node => parseFloat(node.value));
	effectRack[index].i(1).message([args[0]]);

	for (let i = 0; i < args.length; i++) {
		event.currentTarget.parentElement.parentElement.parentElement.getElementsByTagName('output')[i].innerHTML = String(args[i]);
	}
}
