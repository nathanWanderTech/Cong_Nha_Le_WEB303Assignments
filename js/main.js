/**
 * WEB303 Assignment 2
 * Student name: Cong Nha Le
 * Student ID: 0761950
 */

async function handleLoadContent(fileLocation) {
	const $contentEle = $('#content');
	const xhr = new XMLHttpRequest();
	xhr.open('GET', fileLocation, true);
	xhr.onload = function () {
		if (this.status === 200) {
			$contentEle.empty();
			$contentEle.hide();
			$contentEle.append(xhr.responseText);
			$contentEle.fadeIn(2000);
		}
	};
	xhr.send();
}

function assignOnClickContentLinks() {
	const $contentLinks = $('#content-wrapper a');
	$contentLinks.each(function () {
		$(this).on('click', function () {
			const id = $(this).attr('id');
			const fileLocation = `${id}.html`;
			handleLoadContent(fileLocation);
		});
	});
}

$(document).ready(function () {
	assignOnClickContentLinks();
});
