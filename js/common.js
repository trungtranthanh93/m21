$(function(){
	'use strict';
    $(".banner-box").owlCarousel({
        items: 1,
        loop: false,
        autoPlay: true,
        nav: false,
        dots: true
    });
	var $window = $(window);
	var $header = $('#header');
	var $btPageTop = $('#btPageTop');
	var mobile = false;

    function findBootstrapEnvironment() {
        var envs = ['xs', 'sm', 'md', 'lg'];
    
        var $el = $('<div>');
        $el.appendTo($('body'));
    
        for (var i = envs.length - 1; i >= 0; i--) {
            var env = envs[i];
    
            $el.addClass('hidden-'+env);
            if ($el.is(':hidden')) {
                $el.remove();
                return env;
            }
        }
    }
	
	// header size and pagetop btn
	var headerSmall01, headerSmall02 = false;
	
	var headerSize = function(){
        if(findBootstrapEnvironment()){
            return mobile = true;
        }
		if (headerSmall01 || headerSmall02 || mobile) {
			$header.addClass('fixed');
		} else {
			$header.removeClass('fixed');
		}
	};
	
	$window.on('scroll', function(){
		if ($window.scrollTop() >= 80) {
			headerSmall01 = true;
			$btPageTop.removeClass('off');
		} else {
			headerSmall01 = false;
			$btPageTop.addClass('off');
		}
		headerSize();
	}).on('resize', function(){
		if ($window.innerWidth() <= 1200) {
			headerSmall02 = true;
		} else {
			headerSmall02 = false;
		}
		headerSize();
	}).trigger('scroll').trigger('resize');

	
});