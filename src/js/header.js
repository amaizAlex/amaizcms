// *** HEADER***

// открытие/хакрытие мобильного меню
$('.btn-nav').on('click', function(){
	$('html').toggleClass('nav-open')
})

// при смене размера экрана между мобильным меню и десктопным отключаем анимацию
var resizeTimer;

$(window).on('resize', function(){

	$('.header .nav ul').css('transition','none')

	clearTimeout(resizeTimer);
	resizeTimer = setTimeout(function() {

		$('.header .nav ul').css('transition','transform .3s')
	          
	}, 250);
})

// *** END HEADER ***