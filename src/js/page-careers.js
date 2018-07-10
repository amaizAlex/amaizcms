if($('html').hasClass('page_careers')) {
	
	var imageCareers1 = new Waypoint({
		element: $('.page_careers .perks'),
		offset: '35%',
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

	var imageCareers2 = new Waypoint({
		element: $('.page_careers .form-apply'),
		offset: '35%',
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
}