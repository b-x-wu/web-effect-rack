$(document).ready(() => {
	$('#showDelay').on('click', () => {event.preventDefault(); handleShow('delay')});
	$('#showBp').on('click', () => {event.preventDefault(); handleShow('bp')});
	$('#showNoise').on('click', () => {event.preventDefault(); handleShow('noise')});
	$('#showOctave').on('click', () => {event.preventDefault(); handleShow('octave')});
	$('#showReverb').on('click', () => {event.preventDefault(); handleShow('reverb')});
	$('#showShaker').on('click', () => {event.preventDefault(); handleShow('shaker')})
	handleShow('delay');
});

function handleShow(effect) {
	$.get('../patches/' + effect + 'Abs~.pd', (delayPatchStr) => {
		var patch = pdfu.parse(delayPatchStr);
    	var rendered = pdfu.renderSvg(patch, {svgFile: false});
    	$('#svg').html(rendered);
	});
}