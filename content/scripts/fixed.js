$(window).resize(function(){
	
	fixed();

});

$(window).scroll(function(){

    fixed();

});

function fixed(){

	if($('.fixed').length){
		var fixed = $('.fixed');
		var base = $('.fixed-base');
		var pointStart = base.offset().top - 20;
		var pointEnd = base.offset().top + base.outerHeight() - fixed.height() - 20;
		
		if($(window).scrollTop() < pointStart){
			fixed.removeAttr('style').removeClass('scroll');
		} else if($(window).scrollTop() >= pointStart && $(window).scrollTop() <= pointEnd){
			fixed.removeAttr('style').addClass('scroll');
			fixed.width(fixed.parent().width());
		} else if($(window).scrollTop() > pointEnd){
			fixed.removeAttr('style').removeClass('scroll');
			var marginTop = base.outerHeight() - fixed.height();
			fixed.css('margin-top',marginTop);
		}
	}
	
}