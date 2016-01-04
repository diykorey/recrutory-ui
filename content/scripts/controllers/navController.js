kandidatoApp.controller('NavCtrl', function($scope, $rootScope, $location, $timeout) {
    var tabs = [{
        heading: '',
        type: 'image',
        route: '/'
    }, {
        heading: 'Dashboard',
        type: 'link',
        route: 'dashboard'
    }, {
        heading: 'Vacancies list',
        type: 'link',
        route: 'list'
    }, {
        heading: 'Candidate Dashboard',
        type: 'link',
        route: 'candidateDashboard'
    }, {
        heading: 'Candidate List',
        type: 'link',
        route: 'candidateList'
    }];

    $scope.tabs = tabs;


    function navigate(view) {

    }

    $scope.navigate = navigate


    function route(hash) {
        $location.path(hash);
    }


    $scope.route = route;

});
