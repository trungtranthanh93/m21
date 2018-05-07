$(function () {
	'use strict';
	var $window = $(window);
	var $header = $('#header');
	var $btPageTop = $('#btPageTop');
	var mobile = false;

	function findBootstrapEnvironment() {
		var envs = ['xs', 'sm', 'md', 'lg'];

		var $el = $('<div>');
		// $el.appendTo($('body'));

		for (var i = envs.length - 1; i >= 0; i--) {
			var env = envs[i];

			$el.addClass('hidden-' + env);
			if ($el.is(':hidden')) {
				$el.remove();
				return env;
			}
		}
	}

	/** Nav */
	$(document).click(function (e) {
		if (!$(e.target).is('.collapse')) {
			$('.collapse').collapse('hide');
		}
	});

	// header size and pagetop btn
	var headerSmall01, headerSmall02 = false;

	var headerSize = function () {
		if (findBootstrapEnvironment()) {
			return mobile = true;
		}
		if (headerSmall01 || headerSmall02 || mobile) {
			$header.addClass('fixed');
		} else {
			$header.removeClass('fixed');
		}
	};

	$window.on('scroll', function () {
		if ($window.scrollTop() >= 80) {
			headerSmall01 = true;
			$btPageTop.removeClass('off');
		} else {
			headerSmall01 = false;
			$btPageTop.addClass('off');
		}
		headerSize();
	}).on('resize', function () {
		if ($window.innerWidth() <= 1200) {
			headerSmall02 = true;
		} else {
			headerSmall02 = false;
		}
		headerSize();
	}).trigger('scroll').trigger('resize');

	$(".carousel").on("touchstart", function (event) {
		var xClick = event.originalEvent.touches[0].pageX;
		$(this).one("touchmove", function (event) {
			var xMove = event.originalEvent.touches[0].pageX;
			if (Math.floor(xClick - xMove) > 5) {
				$(this).carousel('next');
			} else if (Math.floor(xClick - xMove) < -5) {
				$(this).carousel('prev');
			}
		});
		$(".carousel").on("touchend", function () {
			$(this).off("touchmove");
		});
	});

	// Mouse swipe when mouse is dragged to left/right
	var xClick;
	var mouseDown;

	$(".carousel").on("mousedown", function (event) {
		xClick = event.pageX;
		mouseDown = true;
	});

	$(".carousel").on("mousemove", function (event) {
		if (mouseDown) {
			var xMove = event.pageX;
			if (xClick > xMove) {
				$(this).carousel('next');
			} else if (xClick < xMove) {
				$(this).carousel('prev');
			}
		}
	});

	$(".carousel").on("mouseup", function (event) {
		mouseDown = false;
	});

	// To top pag
	$btPageTop.click(function () {
		$("html, body").animate({
			scrollTop: 0
		}, "slow");
		return false;
	});
});