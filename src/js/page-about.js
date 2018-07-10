if($('html').hasClass('page_about')) {

	
	$('.btn_viewall').on('click', function(){
		$('.leader.hide').slideToggle('300')
		$('.btn_viewall').text($('.btn_viewall').text() == "View all" ? "Hide" : "View all");
	})
	
	var imageOffice1 = new Waypoint({
		element: $('.page_about .content')[1],
		offset: '15%',
		handler: function(direction) {
			if(direction === 'down') {
				$('.fixed_bg1').fadeOut(300)
				$('.fixed_bg2').fadeIn(300)
			} else if (direction === 'up') {
				$('.fixed_bg2').fadeOut(300)
				$('.fixed_bg1').fadeIn(300)
			}
		}
	})

	var imageOffice2 = new Waypoint({
		element: $('.page_about .content')[2],
		offset: '15%',
		handler: function(direction) {
			if(direction === 'down') {
				$('.fixed_bg2').fadeOut(300)
				$('.fixed_bg3').fadeIn(300)
			} else if (direction === 'up') {
				$('.fixed_bg3').fadeOut(300)
				$('.fixed_bg2').fadeIn(300)
			}
		}
	})

	var imageOffice3 = new Waypoint({
		element: $('.page_about .content')[3],
		offset: '15%',
		handler: function(direction) {
			if(direction === 'down') {
				$('.fixed_bg3').fadeOut(300)
				$('.fixed_bg4').fadeIn(300)
			} else if (direction === 'up') {
				$('.fixed_bg4').fadeOut(300)
				$('.fixed_bg3').fadeIn(300)
			}
		}
	})

	var imageOffice4 = new Waypoint({
		element: $('.page_about .content')[4],
		offset: '15%',
		handler: function(direction) {
			if(direction === 'down') {
				$('.fixed_bg4').fadeOut(300)
				$('.fixed_bg5').fadeIn(300)
			} else if (direction === 'up') {
				$('.fixed_bg5').fadeOut(300)
				$('.fixed_bg4').fadeIn(300)
			}
		}
	})
}