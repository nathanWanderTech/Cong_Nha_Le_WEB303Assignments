function renderTeam(data) {
	const $teamViewEle = $('#team');
	$teamViewEle.empty();
	$.each(data, function (key) {
		const member = data[key];
		const template = `<div><h2>${key + 1} / ${member.name}</h2><h5>${member.position}</h5><p>${member.bio}</p></div>`;
		$teamViewEle.append(template);
	});
}

function fetchTeamFromJson() {
	$.getJSON('team.json', renderTeam);
}

/* CALLING AJAX */
function beforeSend() {
	const $teamViewEle = $('#team');
	$teamViewEle.empty().append('<h3>Loading.....</h3><p>Please wait 3 seconds</p>');
}

function onSuccess(data) {
	setTimeout(() => renderTeam(data), 3000);
}

function handleError() {
	const $teamViewEle = $('#team');
	$teamViewEle.empty().append('<h3>The content could not be retrieved</h3>');
}

function fetchTeamFromHTML() {
	$.ajax({
		dataType: 'json',
		url: 'team.json',
		beforeSend,
		success: onSuccess,
		error: handleError,
	});
}

$(document).ready(function () {
	// fetchTeamFromJson();
	fetchTeamFromHTML();
});
