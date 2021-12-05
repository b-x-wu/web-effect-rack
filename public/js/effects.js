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

		// add div to page
		var delayDiv = document.createElement('div');
		setAttributes(delayDiv, {"class" : "effect", "id" : "effect" + String(index)});

		var delayTimeSlider = document.createElement('input');
		setAttributes(delayTimeSlider, {
				"type" : "range",
				"min" : "0",
				"max" : "1000",
				"value" : String(delayTime),
				"class" : "effectChange"
			});

		var feedbackGainSlider = document.createElement('input');
		setAttributes(feedbackGainSlider, {
				"type" : "range",
				"min" : "0",
				"max" : "100",
				"value" : String(feedbackGain),
				"class" : "effectChange"
			});

		var title = document.createElement('div');
		title.setAttribute("class", "delay");
		title.innerHTML = "DELAY"

		var deleteButton = document.createElement('button');
		deleteButton.setAttribute("class", "deleteButton");
		deleteButton.innerHTML = "(delete)";

		delayDiv.append(title, deleteButton, "Delay Time", delayTimeSlider, "Feedback Gain", feedbackGainSlider);
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
	var argsNodeList = event.currentTarget.parentElement.getElementsByTagName("input");
	var args = Array.from(argsNodeList).map(node => parseInt(node.value));
	effectRack[index].i(1).message([args[0]]);
	effectRack[index].i(2).message([args[1]]);
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

		var bpDiv = document.createElement('div');
		setAttributes(bpDiv, {"class" : "effect", "id" : "effect" + String(index)});

		var cutoffSlider = document.createElement('input');
		setAttributes(cutoffSlider, {
				"type" : "range",
				"min" : "0",
				"max" : "500",
				"value" : String(cutoff),
				"class" : "effectChange"
			});

		var qSlider = document.createElement('input');
		setAttributes(qSlider, {
				"type" : "range",
				"min" : "0",
				"max" : "100",
				"value" : String(q),
				"class" : "effectChange"
			});

		var title = document.createElement('div');
		title.setAttribute("class", "bp");
		title.innerHTML = "BP"

		var deleteButton = document.createElement('button');
		deleteButton.setAttribute("class", "deleteButton");
		deleteButton.innerHTML = "(delete)";

		bpDiv.append(title, deleteButton, "Cutoff", cutoffSlider, "Q", qSlider);
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
	var argsNodeList = event.currentTarget.parentElement.getElementsByTagName("input");
	var args = Array.from(argsNodeList).map(node => parseInt(node.value));
	effectRack[index].i(1).message([args[0]]);
	effectRack[index].i(2).message([args[1]]);
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

		var noiseDiv = document.createElement('div');
		setAttributes(noiseDiv, {"class" : "effect", "id" : "effect" + String(index)});

		var levelSlider = document.createElement('input');
		setAttributes(levelSlider, {
				"type" : "range",
				"min" : "0",
				"max" : "100",
				"value" : String(level),
				"class" : "effectChange"
			});

		var title = document.createElement('div');
		title.setAttribute("class", "noise");
		title.innerHTML = "NOISE"

		var deleteButton = document.createElement('button');
		deleteButton.setAttribute("class", "deleteButton");
		deleteButton.innerHTML = "(delete)";

		noiseDiv.append(title, deleteButton, "Level", levelSlider);
		$('#effectRack').append(noiseDiv);

		$('#inputNoiseLevel').val('');

		$('.effectChange').off();
		$('.effectChange').on('change', handleEffectChange);
		$('.deleteButton').off();
		$('.deleteButton').on('click', handleEffectDelete);
	});
}

function handleNoiseChange(event, index) {
	var argsNodeList = event.currentTarget.parentElement.getElementsByTagName("input");
	var args = Array.from(argsNodeList).map(node => parseFloat(node.value));
	effectRack[index].i(1).message([args[0]]);
}
