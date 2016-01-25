kandidatoApp.directive('toggleActiveParent', function($timeout) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            element.bind('click', function() {
				var parent = element.parent();
				if(parent.hasClass('active')){
					element.parent().removeClass('active');
					element.parent().find('.textarea').removeAttr('style');
				} else {
					element.parent().addClass('active');
					s_height = element.parent().find('.textarea').scrollHeight;
					alert(s_height);
					element.parent().find('.textarea').height(s_height);
				}
            });
        }
    };
});