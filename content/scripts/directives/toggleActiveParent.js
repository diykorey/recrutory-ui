kandidatoApp.directive('toggleActiveParent', function($timeout) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            element.bind('click', function() {
				var parent = element.parent();
				if(parent.hasClass('active')){
					element.parent().removeClass('active');
				} else {
					element.parent().addClass('active');
				}
            });
        }
    };
});