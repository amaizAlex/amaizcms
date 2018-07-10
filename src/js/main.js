// Убирает класс запрещающий анимацию при загрузке
setTimeout(function(){
	$('body').removeAttr('id')
}, 500)


$('.page_vacancy .btn-apply').on('click', function(){
	$('html, body').animate({ scrollTop: $('.form-apply').offset().top }, 500);
})

$(document).keydown(function(e) {
	if( e.keyCode === 27 && $('html.nav-open')) {
		$('html').removeClass('nav-open')
	}
})

//= header.js


$(document).ready(function(){

	//= form-simple.js

	//= form-application.js
	
	//= cookie.js

	//= retina.js

	//= waypoints.js

	//= page-home.js

	//= page-about.js

	//= page-careers.js
	
})