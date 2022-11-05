var modal = (function () {
	//Declare modal object
	var $window = $(window);
	var $modal = $('<div class="modal"></div>'); //create markup for modal
	var $content = $('<div class="modal-content"></div>');
	var $close = $('<button role="button" class="modal-close">CLOSE</button>'); //Create close butoon in modal

	$modal.append($content);

	return {
		center: function () {
			$modal.css({
				top: 0, //Center vertical ly
				left: 0, //Center horizontally
			});
		},
		open: function (settings) {
			//Define open() method
			$content.empty().append(settings.content).append($close); //Set new content of modal
			$close.on('click', function (e) {
				e.preventDefault();
				modal.close();
			});
			$content.css({
				maxWidth: settings.width || 'auto',
				maxHeight: settings.height || 'auto',
				position: 'absolute',
				top: '30%',
				left: '50%',
				transform: 'translate(-50%, -30%)',
			});

			$modal
				.css({
					//Set modal dimensions
					width: '100vw',
					height: '100vh',
					background: 'rgba(153, 149, 149, 0.9)',
					position: 'fixed',
				})
				.appendTo('body'); //Add it to the page

			modal.center(); //Call center() method
			$(window).on('resize scroll', modal.center); //Call it if window resized
		},
		close: function () {
			//Define close() method
			$content.empty(); //Remove content from modal
			$modal.detach(); //Remove modal from page
			$window.off('resize', modal.center); //Remove event handler
		},
		addHeading: function (title) {
            const $heading = `<h1>${title || 'Beauty nature'} - photo from Unsplash</h1>`
			$content.prepend($heading);
		},
	};
})();
