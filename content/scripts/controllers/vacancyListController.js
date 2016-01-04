kandidatoApp.controller('vacancyListCtrl', function($scope, $rootScope, $log, ApiDataFactory, $timeout, $location, debounce, api) {
$rootScope.prevLocation = $location.path();
    $scope.vacancyTableItems = [
        'Name',
        'State',
        'Date'
    ]

    var debounceSearch = debounce(500, function (name, email, type) {
      if (name != "" && name || email != "" && email) {
        api.vacancyPagingFilter(name, email).then(function (data) {

        $scope.$broadcast("listFilterSearch", data.data)
            })
      }
      else{
        $scope.$broadcast("listFilterSearch", false)
      }


    });

    $scope.filterList = {
      byName :  function (name, email) {
      debounceSearch(name, email, 1)
      },
      byEmail :  function (name, email) {
      debounceSearch(name, email, 2)
      }
    }

    $scope.orderByVals = {}
    $scope.setOrder = function(item) {

        if ($scope.orderVal && $scope.orderVal.active == item.toLowerCase()) {
            delete $scope.orderVal;

        } else {
            switch (item.toLowerCase()) {
                case 'date':
                    item = 'creationDate';
                    break;
            }
            $scope.orderVal = {}
            $scope.orderVal.active = item.toLowerCase()
            $scope.orderVal.filter = item.toLowerCase()
            console.log($scope.orderVal)
        }


    }


});
