$(document).ready(function () {
	$('.accordion').on('click', '.accordion-control', function (e) {
		e.preventDefault();
		$(this).next('.accordion-panel').not(':animated').slideToggle();
	});

	// TAB
	$('.tab-list').each(function () {
		const $this = $(this);
		let $tab = $this.find('li.active');
		const $link = $tab.find('a');
		let $panel = $($link.attr('href'));
		$this.on('click', '.tab-control', function (e) {
			e.preventDefault();
			const $link = $(this);
			const id = this.hash;
			if (id && !$link.parent().is('.active')) {
				$panel.removeClass('active');
				$tab.removeClass('active');
				$panel = $(id).addClass('active');
				$tab = $link.parent().addClass('active');
			}
		});
	});
});
