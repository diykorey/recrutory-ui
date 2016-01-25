$(document).ready(function(){

	textareaFlex();

});

function textareaFlex(){
	
	$.each($('textarea[data-autoresize]'), function() {
		alert('111');
		var offset = this.offsetHeight - this.clientHeight;
		var resizeTextarea = function(el) {
			$(el).css('height', 'auto').css('height', el.scrollHeight + offset);
		};
		$(this).on('keyup input', function() { resizeTextarea(this); }).removeAttr('data-autoresize');
	});
	
}