var elements = document.getElementsByClassName("fullscreen");
for (var i = 0; i < elements.length; i++) {
	let fullscreen = elements[i];
	if (fullscreen) fullscreen.style.height = window.innerHeight;
}

(function ($) {
	"use strict";

	/* Page Loader */
	if ((".loader").length) {
		// show Preloader until the website ist loaded
		$(window).on('load', function () {
			$(".loader").fadeOut("slow");
		});
	}

	// Back to top button
	$('.back-to-top').fadeOut();
	$(window).scroll(function () {
		if ($(this).scrollTop() > 100) {
			$('.back-to-top').fadeIn();
			$('.navbar').addClass('navbar-shrink');
		} else {
			$('.back-to-top').fadeOut();
			$('.navbar').removeClass('navbar-shrink');
		}
	});
	$('.back-to-top').click(function () {
		$('html, body').animate({ scrollTop: 0 }, 100, 'easeInOutExpo');
		return false;
	});

	/* Carousel */
	var carousel = function () {
		$(".testimonials-carousel").owlCarousel({
			autoplay: true,
			autoHeight: true,
			autoplayTimeout: 3000,
			autoplayHoverPause: true,
			center: true,
			loop: true,
			nav: false,
			dots: true,
			margin: 10,
			items: 1
		});
	};
	carousel();

	// magnific popup
	$('.image-popup').magnificPopup({
		type: 'image',
		closeOnContentClick: true,
		closeBtnInside: false,
		fixedContentPos: true,
		mainClass: 'mfp-no-margins mfp-with-zoom', // class to remove default margin from left and right side
		gallery: {
			enabled: true,
			navigateByImgClick: true,
			preload: [0, 1] // Will preload 0 - before current, and 1 after the current image
		},
		image: {
			verticalFit: true
		},
		zoom: {
			enabled: true,
			duration: 300, // don't foget to change the duration also in CSS
			opener: function(element) {
				return element;
			}
		}
	});

	$('.popup-youtube, .popup-vimeo, .popup-gmaps').magnificPopup({
		disableOn: 700,
		type: 'iframe',
		mainClass: 'mfp-fade',
		removalDelay: 160,
		preloader: false,
		fixedContentPos: false
	});

	// Scrollax
	$.Scrollax();

})(jQuery);
