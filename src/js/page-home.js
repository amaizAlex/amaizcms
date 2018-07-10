if($('html').hasClass('page_home')) {

	// scroll to form
	$('.scroll-to-form .btn-blue').on('click', function(){
		$('html, body').animate({ scrollTop: $('.form-simple').offset().top -80 }, 500);
	})

	// Dots
	$('.toSection1').on('click', function() {
		$('html, body').animate({
			scrollTop: $(".section1").offset().top
		}, 500);
	})

	$('.toSection2').on('click', function() {
		$('html, body').animate({
			scrollTop: $(".section2").offset().top - (($(window).height() - $('.section2').height()) / 2)
		}, 500);
	})

	$('.toSection3').on('click', function() {
		$('html, body').animate({
			scrollTop: $(".section3").offset().top - (($(window).height() - $('.section3').height()) / 2)
		}, 500);
	})

	$('.toSection4').on('click', function() {
		$('html, body').animate({
			scrollTop: $(".section4").offset().top - (($(window).height() - $('.section4').height()) / 2)
		}, 500);
	})

	$('.toSection5').on('click', function() {
		$('html, body').animate({
			scrollTop: $(".section5").offset().top - (($(window).height() - $('.section5').height()) / 2)
		}, 500);
	})

	
	// change screenshoots
	$('.fixed_bg2, .fixed_bg3, .fixed_bg4, .fixed_bg5').fadeOut(0)

	var fixed_bg1 = new Waypoint({
		element: $('.page_home .content')[1],
		offset: '30%',
		handler: function(direction) {
			if(direction === 'down') {
				$('.fixed_bg2').fadeIn(300)
				$('.dots_dot').removeClass('active')
				$('.dots_dot:nth-child(2)').addClass('active')
			} else if (direction === 'up') {
				$('.fixed_bg2').fadeOut(300)
				$('.dots_dot').removeClass('active')
				$('.dots_dot:nth-child(1)').addClass('active')
			}
		}
	})

	var fixed_bg2 = new Waypoint({
		element: $('.page_home .content')[2],
		offset: '30%',
		handler: function(direction) {
			if(direction === 'down') {
				$('.fixed_bg3').fadeIn(300)
				$('.dots_dot').removeClass('active')
				$('.dots_dot:nth-child(3)').addClass('active')
			} else if (direction === 'up') {
				$('.fixed_bg3').fadeOut(300)
				$('.dots_dot').removeClass('active')
				$('.dots_dot:nth-child(2)').addClass('active')
			}
		}
	})

	var fixed_bg3 = new Waypoint({
		element: $('.page_home .content')[3],
		offset: '30%',
		handler: function(direction) {
			if(direction === 'down') {
				$('.fixed_bg4').fadeIn(300)
				$('.dots_dot').removeClass('active')
				$('.dots_dot:nth-child(4)').addClass('active')
			} else if (direction === 'up') {
				$('.fixed_bg4').fadeOut(300)
				$('.dots_dot').removeClass('active')
				$('.dots_dot:nth-child(3)').addClass('active')
			}
		}
	})

	var fixed_bg4 = new Waypoint({
		element: $('.page_home .content')[4],
		offset: '30%',
		handler: function(direction) {
			if(direction === 'down') {
				$('.fixed_bg5').fadeIn(300)
				$('.dots_dot').removeClass('active')
				$('.dots_dot:nth-child(5)').addClass('active')
			} else if (direction === 'up') {
				$('.fixed_bg5').fadeOut(300)
				$('.dots_dot').removeClass('active')
				$('.dots_dot:nth-child(4)').addClass('active')
			}
		}
	})

	var fixed_bg4 = new Waypoint({
		element: $('.page_home .footer'),
		offset: ($(window).height() - $('.footer').height()) + 50,
		handler: function(direction) {
			if(direction === 'down') {
				$('.fixed_bg6').fadeIn(300)
			} else if (direction === 'up') {
				$('.fixed_bg6').fadeOut(300)
			}
		}
	})
}