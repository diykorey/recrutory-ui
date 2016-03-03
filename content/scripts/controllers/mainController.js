kandidatoApp.controller('MainCtrl', function($scope, $rootScope, $location, $mdToast, $timeout, $cookies, ApiDataFactory) {
    if(location.pathname =='/'){
      $location.path("/vacancyDashboard");
    }
    if(location.pathname =='login'){
      $location.path("/vacancyDashboard");

    }

    $scope.currentNavTab = location.pathname.substring(1);

    function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
    }

     $scope.$on('searchEvent', function(event, data) {
       var evtName = "search" + capitalizeFirstLetter(data.type) + "DataArrived"
       $scope.$broadcast(evtName, data.data);
       $scope.searchData = data
    });

    $scope.setCurrentTab = function(tab) {
        $scope.currentNavTab = tab
          $scope.$broadcast('changeTab', $scope.currentNavTab);
    }



    var tabs = [{

        heading: 'Vacancy Dashboard',
        type: 'link',
        route: 'vacancyDashboard'
    }, {
        heading: 'Vacancy List',
        type: 'link',
        route: 'vacancyList'
    }, {
        heading: 'Candidate Dashboard',
        type: 'link',
        route: 'candidateDashboard'
    }, {
        heading: 'Candidate List',
        type: 'link',
        route: 'candidateList'
    }];

    $scope.tabsVacancies = [{
        heading: 'Main',
    }, {
        heading: 'Flow',

    }, {
        heading: 'Suggestions',

    }, {
        heading: 'Notes',

    }];

    $scope.vacancyActions = [{
        name: "INIT"
    }, {
        name: "CONTACT"
    }, {
        name: "INTERVIEW"
    }, {
        name: "OFFER"
    }, {
        name: "HIRED"
    }, {
        name: "REJECTED"
    }]

    $scope.tableFilters = {}


    $scope.tabsCandidateDetails = [{
        heading: 'Main',
    }, {
        heading: 'Flow',

    }, {
        heading: 'Suggestions',
    }, {
        heading: 'Notes',

    }];


    // Hack for default tab
    $timeout(function() {
        $scope.selectedIndexMain = 2
    }, 0);
    $timeout(function() {
        $scope.selectedIndexMain = 1
    }, 100);

    $scope.$watch('selectedIndexMain', function(newVal, oldVal) {
        if (newVal == 0) {
            $scope.selectedIndexMain = oldVal
        };
    });

    $scope.showToast = function() {
        $mdToast.show(
            $mdToast.simple()
            .content('Got it ! Updated.')
            .position('right top')
            .hideDelay(3000)
        );
    };


    $scope.searchTrigger = {

        start: function() {

            // if ($location.path().indexOf("Search") > -1) {
            //     return
            // } else {
            //     var location = $location.path() + "Search";
            //     $location.path(location)
            //     console.log(location)
            // }
            $scope.searchProcess ? $scope.searchProcess : $scope.searchProcess = true;

        },
        end: function() {
            delete $scope.searchProcess
        }

    }

    $scope.$on('$routeChangeStart', function(next, current) {
        var path = current.$$route.originalPath.toLowerCase()

        if (path.indexOf("vacancy") > -1) {
            $scope.searchPlaceholder = 'Vacancy search'
        };
        if (path.indexOf("candidate") > -1) {
            $scope.searchPlaceholder = 'Candidate search'
        };

    });


    $scope.tabs = tabs;


    function navigate(view) {

    }

    $scope.navigate = navigate


    function route(hash) {
        $location.path(hash);
    }


    $scope.route = route;

});
