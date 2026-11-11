kandidatoApp.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/vacancyDashboard');

    $stateProvider
        .state('root',{
          url: '',
          abstract: true,
          views: {
            'navbar': {
              templateUrl: '/views/navbar.html',
            },
             'searchbar': {
              templateUrl: '/views/searchbar.html',
              controller: 'searchbarCtrl'
            }
          }
    })
    .state('root.vacancyDash', {
          url: '/vacancyDashboard',
          views: {
            'container@': {
              templateUrl: '/views/vacancyDashboard.html',
              controller: 'vacancyDashboardCtrl'
            }
          }
        })
        .state('root.vacancyList', {
              url: '/vacancyList',
              views: {
                'container@': {
                  templateUrl: '/views/vacancyList.html',
                  controller: 'vacancyListCtrl'
                }
              }
            })
        .state('root.candidateDash', {
              url: '/candidateDashboard',
              views: {
                'container@': {
                  templateUrl: '/views/candidateDashboard.html',
                  controller: 'candidateDashboardCtrl'
                }
              }
            })
            .state('root.candidateList', {
                  url: '/candidateList',
                  views: {
                    'container@': {
                      templateUrl: '/views/candidateList.html',
                      controller: 'candidateListCtrl'
                    }
                  }
                })
            .state('root.uploadcv', {
                  url: '/uploadCV',
                  views: {
                    'container@': {
                      templateUrl: '/views/addCV.html',
                      controller: 'addCvCtrl'
                    }
                  }
                })
              .state('root.addCandidate', {
                  url: '/addCandidate',
                  views: {
                    'container@': {
                      templateUrl: '/views/addCandidate.html',
                      controller: 'addCandidate'
                    }
                  }
                })
                .state('root.addVacancy', {
                  url: '/addVacancy',
                  views: {
                    'container@': {
                      templateUrl: '/views/addVacancy.html',
                      controller: 'addVacancyCtrl'
                    }
                  }
                })  .state('root.search', {
                        url: '/search',
                        views: {
                          'container@': {
                            templateUrl: '/views/search.html',
                            controller: 'searchView'
                          }
                        }
                      })
});
