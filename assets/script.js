AOS.init({
	duration: 800,
	easing: 'slide',
	once: true
});

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

	$('a').click(function(e){
		if($(this).hasClass("back-to-top")) return;
		let tag = $.attr(this, 'href');
		if(!tag.startsWith("#")) return;
		$('html, body').animate({ scrollTop: $( $.attr(this, 'href') ).offset().top }, 100, 'easeInOutExpo');
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

	// Navigation
	var scrollSpy = new bootstrap.ScrollSpy(document.body, {
		target: '#mainNav'
	});

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
			duration: 300 // don't foget to change the duration also in CSS
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

	var isMobile = {
		Android: function () {
			return navigator.userAgent.match(/Android/i);
		},
		BlackBerry: function () {
			return navigator.userAgent.match(/BlackBerry/i);
		},
		iOS: function () {
			return navigator.userAgent.match(/iPhone|iPad|iPod/i);
		},
		Opera: function () {
			return navigator.userAgent.match(/Opera Mini/i);
		},
		Windows: function () {
			return navigator.userAgent.match(/IEMobile/i);
		},
		any: function () {
			return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
		}
	};

})(jQuery);

// Contact Form
$(function () {
	if(!document.getElementById("contactForm")) return;
	let url = document.getElementById("contactForm").action;
	$("#contactForm input,#contactForm textarea").jqBootstrapValidation({
		preventSubmit: true,
		submitError: function ($form, event, errors) {
			// additional error messages or events
		},
		submitSuccess: function ($form, event) {
			event.preventDefault(); // prevent default submit behaviour
			// get values from FORM
			var name = $("input#name").val();
			var email = $("input#email").val();
			var phone = $("input#phone").val();
			var message = $("textarea#message").val();
			var firstName = name; // For Success/Failure Message
			// Check for white space in name for Success/Fail message
			if (firstName.indexOf(' ') >= 0) {
				firstName = name.split(' ').slice(0, -1).join(' ');
			}
			$this = $("#sendMessageButton");
			$this.prop("disabled", true); // Disable submit button until AJAX call is complete to prevent duplicate messages
			$.ajax({
				url: url,
				type: "POST",
				dataType: "json",
				data: {
					name: name,
					phone: phone,
					email: email,
					message: message
				},
				cache: false,
				success: function () {
					// Success message
					let success = document.getElementById("success");
					success.innerHTML = `
					<div class="alert alert-success alert-dismissible fade show" role="alert">
						<strong>Your message has been sent.</strong>
						<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
					</div>`;
					//clear all fields
					$('#contactForm').trigger("reset");
				},
				error: function () {
					// Fail message
					let success = document.getElementById("success");
					success.innerHTML = `
					<div class="alert alert-danger alert-dismissible fade show" role="alert">
						<strong>Sorry ${firstName},</strong> it seems that my mail server is not responding. Please try again later!
						<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
					</div>`;
					//clear all fields
					$('#contactForm').trigger("reset");
				},
				complete: function () {
					setTimeout(function () {
						$this.prop("disabled", false); // Re-enable submit button when AJAX call is complete
					}, 1000);
				}
			});
		},
		filter: function () {
			return $(this).is(":visible");
		},
	});

	$("a[data-toggle=\"tab\"]").click(function (e) {
		e.preventDefault();
		$(this).tab("show");
	});
});

/*When clicking on Full hide fail/success boxes */
$('#name').focus(function () {
	let success = document.getElementById("success");
	success.innerHTML = "";
});
