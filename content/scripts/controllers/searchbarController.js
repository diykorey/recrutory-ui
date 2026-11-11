kandidatoApp.controller('searchbarCtrl', function($scope, $rootScope, debounce, api, $location) {

    var debounceSearch = debounce(500, function(query) {

        var type = $rootScope.entityCurrent;
        if (query.length > 0)
            api.search(type, query).then(function(resultData) {
                $location.path($rootScope.prevLocation, false)
                $scope.$emit('searchEvent', {
                    type: type,
                    data: resultData
                });
            })
        else {
            $location.path($rootScope.prevLocation, false)
            $scope.$emit('searchEvent', {
                type: type,
                data: false
            });
        }
    });

    $scope.$on('changeTab', function(event, data) {
        $scope.searchText = ""
    });


    $scope.search = function() {
        debounceSearch(this.searchText)
    }
});
