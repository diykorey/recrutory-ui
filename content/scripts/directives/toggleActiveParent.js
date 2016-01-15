kandidatoApp.directive('toggleActiveParent', function($timeout) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            element.bind('click', function() {
                element.parent().toggleClass('active');
            });
        }
    };
});