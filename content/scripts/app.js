'use strict';

/**
 * @ngdoc overview
 * @name kandidatoApp
 * @description
 * # kandidatoApp
 *
 * Main module of the application.
 */



var kandidatoApp = angular.module('kandidatoApp', [
    'ui.router',
    'ngMaterial',
    'ngAnimate',
    'rt.debounce',
    'ngFileUpload'
])


kandidatoApp.config(function($locationProvider) {
    $locationProvider.html5Mode(true);
});



kandidatoApp.$inject = ['$scope', 'ApiDataFactory'];
