let request; //Latest image to be requested
let $current; //Image currently being shown
const cache = {};
const $frame = $('.photo-box'); //Container for image
const $thumbs = $('.thumb'); //Container for thumbnail

function crossfade($img) {
	//Function to fade between images, pass new image as param
	if ($current) {
		//If there is currently an image showing

		$current.stop().fadeOut('slow'); //Stop animation and fade it out
	}

	$img.css({
		//Set the CSS margins for the image
		marginLeft: -$img.width() / 2,
		marginTop: -$img.height() / 2,
	});
	$img.stop().fadeTo('slow', 1); //Stop ani mation on new i mage & fade in
	$current = $img; //New image becomes current image
}

$.fn.customPhotoViewer = function () {
	$(document).on('click', '.thumbnail-anchor', function (e) {
		//When a thumb is clicked on
		console.log('Click on thumbnail-anchor');
		var $img; //Create local variable called $img
		var src = this.href; //Store path to image

		request = src; //Store path again in request

		e.preventDefault(); //Stop default link behavior
		$thumbs.removeClass('active'); //Remove active from al l thumbs
		$(this).addClass('active'); //Add active to clicked thumb

		if (cache.hasOwnProperty(src)) {
			//If cache contains this image

			if (cache[src].isLoading === false) {
				//And if isloading is false
				crossfade(cache[src].$img); //Call crossfade() function
			}
		} else {
			//Otherwise it is not in cache
			$img = $('<img/>'); //Store empty <imgl> element in $img

			cache[src] = {
				//Store this image in cache
				$img: $img, //Add the path to the image
				isLoading: true, //Set isloading property to true
			};
			//Next few lines will run when image has loaded but are prepared first
			$img.on('load', function () {
				//When image has loaded
				$img.hide(); //Hide it
				//Remove is-loading class from frame & append new image to it
				$frame.removeClass('is-loading').append($img); //
				cache[src].isLoading = false; //Update isloading in cache
				//If still most recently requested image then
				if (request === src) {
					crossfade($(this)); //Call crossfade(} function
				} //Solves asynchronous loading issue
			});
			$frame.addClass('is-loading'); //Add is-loading class to frame
			$img.attr({
				//Set attributes on <img> element
				src: src, //Add src attribute to load image
				alt: this.title || '', //Add title if one was given in link
			});
			$img.css({ padding: 10, border: '1px solid blue' }); // Style for image
		}
		return this;
	});
	return this;
};
