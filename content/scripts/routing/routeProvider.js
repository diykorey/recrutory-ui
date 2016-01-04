'use strict';

kandidatoApp.config(function($routeProvider) {
    $routeProvider
        .when('/vacancyDashboard', {
            templateUrl: 'views/vacancyDashboard.html',
            controller: 'vacancyDashboardCtrl'
        })
        .when('/vacancyList', {
            templateUrl: 'views/vacancyList.html',
            controller: 'vacancyListCtrl'
        })
        .when('/addVacancy', {
            templateUrl: 'views/addVacancy.html',
            controller: 'addVacancyCtrl',
        })
        .when('/addCandidate', {
            templateUrl: 'views/addCandidate.html',
            controller: 'addCandidate',
        })
        .when('/uploadCV', {
            templateUrl: 'views/addCV.html',
            controller: 'addCvCtrl',
        })
        .when('/candidateDashboard', {
            templateUrl: 'views/candidateDashboard.html',
            controller: 'candidateDashboardCtrl'
        })
        .when('/candidateList', {
            templateUrl: 'views/candidateList.html',
            controller: 'candidateListCtrl'
        })
        .when('/candidateDashboardSearch', {
            templateUrl: 'views/candidateSearch.html',
            controller: 'searchCtrl'
        })
        .when('/candidateListSearch', {
            templateUrl: 'views/candidateSearch.html',
            controller: 'searchCtrl'
        })
        .when('/vacancyDashboardSearch', {
            templateUrl: 'views/vacancySearch.html',
            controller: 'searchCtrl'
        })
        .when('/vacancyListSearch', {
            templateUrl: 'views/vacancySearch.html',
            controller: 'searchCtrl'
        })
        .otherwise({
            redirectTo: '/vacancyDashboard'
        });
});
