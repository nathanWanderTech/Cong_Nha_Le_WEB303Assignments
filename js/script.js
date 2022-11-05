$(function () {
	$('#photo-viewer')
		.customPhotoViewer()
		.show()
		.on('click', '.photo-box', function (e) {
			var $content = $(this).clone().find('img').css({
				marginLeft: 0,
				marginTop: 0,
				width: '100%',
				height: 'auto',
			});
			//modal code goes here
		});
});

/* CONG NHA LE - My code starts here */
function changeH1TagWithMyName() {
	$('h1').text('CONG NHA LE');
}

/**
 * Set href to photo box
 */
function setHrefForPhotoBox() {
	$(document).on('click', '.thumbnail-anchor', function (e) {
		const src = this.href;
		const $photoBox = $('a.photo-box');
		$photoBox.attr({ href: src });
	});
}

$(document).ready(function () {
	changeH1TagWithMyName();

	/* STYLE CSS */
	$('.photo-box').css({ margin: '0 auto' });
	$('.photo-thumbnails').css({ display: 'flex', justifyContent: 'center', marginTop: 20, gap: 10 });

	/* Bind event */
	setHrefForPhotoBox();
	$('.thumbnail-anchor').eq(0).click();
});
