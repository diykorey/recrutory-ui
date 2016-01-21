kandidatoApp.directive('fixedAside', function() {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
		
			element.click(function(){
				fixed();
			});
			
        }
    };
});
