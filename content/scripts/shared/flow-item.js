kandidatoApp.directive('flowItem', function() {
    return {
        restrict: 'E',
        replace: 'true',
        templateUrl: 'views/shared/flow-item.html',
        scope: {
            flowList: '='
        }
    };
});
