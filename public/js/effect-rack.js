var effectRack = [];
var effectRackOn = false;
var effectRackPatch;

var adcEffectRack;
var dacEffectRack;

function handleEffectRack(event) {
	event.preventDefault();
	if (effectRackOn) {
		stopEffectRack();
	} else {
		startEffectRack();
	}
	effectRackOn = !effectRackOn;
}

function startEffectRack() {
	console.log(effectRack);

	for (let i = 0; i < effectRack.length; i++) {
		if (i === 0) {
			adcEffectRack.o(0).connect(effectRack[0].i(0));
		} else {
			effectRack[i - 1].o(0).connect(effectRack[i].i(0));
		}
	}

	if (effectRack.length > 0) {
		effectRack[effectRack.length - 1].o(0).connect(dacEffectRack.i(0));
		effectRack[effectRack.length - 1].o(0).connect(dacEffectRack.i(1));
	} else {
		adcEffectRack.o(0).connect(dacEffectRack.i(0));
		adcEffectRack.o(0).connect(dacEffectRack.i(1));
	}

	// change button html
	$('#buttonEffectRack').html("Stop Effect Rack");
}

function stopEffectRack() {
	if (effectRack.length > 0) {
		adcEffectRack.o(0).disconnect(effectRack[0].i(0));
		effectRack[effectRack.length - 1].o(0).disconnect(dacEffectRack.i(0));
		effectRack[effectRack.length - 1].o(0).disconnect(dacEffectRack.i(1));
	} else {
		adcEffectRack.o(0).disconnect(dacEffectRack.i(0));
		adcEffectRack.o(0).disconnect(dacEffectRack.i(1));
	}
	$('#buttonEffectRack').html("Start Effect Rack");
}

function clearEffectRack(event) {
	event.preventDefault();
	stopEffectRack();
	effectRackOn = false;
	effectRack = [];
	$('#effectRack').html('');
}

function handleAddDelay(event) {
	event.preventDefault();

	var delayTime = parseInt($('#inputDelayDelayTime').val());
	var feedbackGain = parseInt($('#inputDelayFeedbackGain').val());

	// add delay patch to effectRack
	$.get('patches/delayAbs~.pd', (delayPatchStr) => {
		Pd.registerAbstraction('delayAbs~', delayPatchStr);
		effectRack.push(effectRackPatch.createObject('delayAbs~', [delayTime, feedbackGain]));
	});

	// add div to page
	var delayDiv = document.createElement('div');
	delayDiv.innerHTML = "DELAY - Delay Time: " + String(delayTime) + ", Feedback Gain: " + String(feedbackGain);
	$('#effectRack').append(delayDiv);

	// clear input fields
	$('#inputDelayDelayTime').val('');
	$('#inputDelayFeedbackGain').val('');
}

function handleAddBp(event) {
	event.preventDefault();

	var cutoff = parseInt($('#inputBpCutoff').val());
	var q = parseInt($('#inputBpQ').val());

	$.get('patches/bpAbs~.pd', (bpPatchStr) => {
		Pd.registerAbstraction('bpAbs~', bpPatchStr);
		effectRack.push(effectRackPatch.createObject('bpAbs~', [cutoff, q]));
	});

	var bpDiv = document.createElement('div');
	bpDiv.innerHTML = "BP - Cutoff: " + String(cutoff) + ", Q: " + String(q);
	$('#effectRack').append(bpDiv);

	$('#inputBpCutoff').val('');
	$('#inputBpQ').val('');
}