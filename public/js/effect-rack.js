var effectRack = [];
var effectRackOn = false;
var effectRackPatch;

var adcEffectRack;
var dacEffectRack;
var gainEffectRack;

function handleEffectRack(event) {
	event.preventDefault();
	if (effectRackOn) {
		stopEffectRack();
	} else {
		startEffectRack();
	}
	effectRackOn = !effectRackOn;
}

function connectObjects() {
	Pd.start();

	for (let i = 0; i < effectRack.length; i++) {
		if (i === 0) { // connect adc to the first effect
			adcEffectRack.o(0).connect(effectRack[0].i(0));
		} else { // connect effects to each other
			effectRack[i - 1].o(0).connect(effectRack[i].i(0));
		}
	}

	if (effectRack.length > 0) { // connect effects to gain
		effectRack[effectRack.length - 1].o(0).connect(gainEffectRack.i(0));
	} else { // connect adc to gain
		adcEffectRack.o(0).connect(gainEffectRack.i(0));
	}

}

function disconnectObjects() {
	Pd.stop();

	for (let i = 0; i < effectRack.length; i++) {
		if (i === 0) {
			adcEffectRack.o(0).disconnect(effectRack[0].i(0));
		} else {
			effectRack[i - 1].o(0).disconnect(effectRack[i].i(0));
		}
	}

	if (effectRack.length > 0) {
		effectRack[effectRack.length - 1].o(0).disconnect(gainEffectRack.i(0));
	} else {
		adcEffectRack.o(0).disconnect(gainEffectRack.i(0));
	}
}

function startEffectRack() {
	connectObjects();
	$('#buttonEffectRack').html("Stop Effect Rack");
	console.log(effectRackPatch);
}

function stopEffectRack() {
	disconnectObjects();
	$('#buttonEffectRack').html("Start Effect Rack");
}

function clearEffectRack(event) {
	event.preventDefault();
	effectRackOn = false;
	effectRack = [];

	Pd.start();
	Pd.destroyPatch(effectRackPatch);
	Pd.stop();

	openPd();

	$('#buttonEffectRack').html("Start Effect Rack");
	$('#effectRack').html('');
}

function handleGainChange(event) {
	var gain = parseInt($('#inputGain').val())
	gainEffectRack.i(1).message([gain / 100]);
}

function handleEffectChange(event) {
	var index = event.currentTarget.parentElement.id.slice(6);
	var selectedEffect = event.currentTarget.parentElement.getElementsByTagName("div")[0].className;
	switch (selectedEffect) {
		case "delay":
			handleDelayChange(event, index);
			break;
		case "bp":
			handleBpChange(event, index);
			break;
		case "noise":
			handleNoiseChange(event, index);
			break;
	}
}

function handleEffectDelete(event) {
	var index = event.currentTarget.parentElement.id.slice(6);
	var parentDiv = event.currentTarget.parentElement.parentElement;

	// remove element from effectRack
	disconnectObjects();
	effectRack.splice(index, 1);
	if (effectRackOn) {connectObjects()};

	// remove child from parentDiv
	parentDiv.removeChild(parentDiv.childNodes[index]);

	// renumber effect ids
	for (let i = 0; i < effectRack.length; i++) {
		parentDiv.childNodes[i].id = "effect" + String(i);
	}
}

// add waveform and vu meter visualization
// add css