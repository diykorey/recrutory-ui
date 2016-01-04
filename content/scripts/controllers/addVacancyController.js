kandidatoApp.controller('addVacancyCtrl', function($scope, $rootScope, $location, ApiDataFactory) {

    $scope.vacancy = {
        tags: [],
        hot: true
    }

    $scope.addVacancy = function() {
        $rootScope.updateProcess = true
        var URL = "vacancy";
        ApiDataFactory.queryPost(URL, JSON.stringify($scope.vacancy)).then(function(result) {
            delete $scope.vacancy;
            $rootScope.updateProcess = false;
            $scope.showToast();

        })
    }
});
