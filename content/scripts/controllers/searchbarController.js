kandidatoApp.controller('searchBar', function($scope, $rootScope, debounce, api, $location) {
      var debounceSearch = debounce(500, function (query) {
        var type = $rootScope.entityCurrent;
        if(query.length > 0)
        api.search(type, query).then(function (reponse) {
          $location.path($rootScope.prevLocation, false)
          $scope.$emit('searchEvent', {type: type, data: reponse.data});
        })
        else{
          $location.path($rootScope.prevLocation, false)
          $scope.$emit('searchEvent', {type: type, data: false});
        }
      });

      $scope.$on('changeTab', function(event, data) {
      $scope.searchText = ""
      });


      $scope.search = function () {
        debounceSearch($scope.searchText)
      }
});
