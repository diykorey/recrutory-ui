kandidatoApp.controller('NavCtrl', function($scope, $rootScope, $location, $timeout) {
    var tabs = [{
        heading: '',
        type: 'image',
        route: '/'
    }, {
        heading: 'Vacancy Dashboard',
        type: 'link',
        route: 'dashboard'
    }, {
        heading: 'Vacancy List',
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
