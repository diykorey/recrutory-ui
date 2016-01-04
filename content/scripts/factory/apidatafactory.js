'use strict';

kandidatoApp.factory('ApiDataFactory', ['$http', '$q', '$log', function($http, $q, $log) {


    var apiURL = "http://recrutory-web-dev.cloudapp.net:8080/recrutory/"

    var factory = {
        queryGet: function(url) {
            var URL = apiURL + url;
            var data = $http({
                method: 'GET',
                url: URL
            }).then(function(result) {
                $log.info("API data got, request successfull");
                return result.data

            }, function(result) {
                $log.error("No API data returned, check your internet connection or try later.");
            });

            return data;
        },
        queryPost: function(url, dataPost) {
            var URL = apiURL + url;
            var dataPost = dataPost
            var data = $http({
                method: 'POST',
                data: dataPost,
                url: URL
            }).then(function(result) {
                $log.info("API data got, request successfull");
                return result.data

            }, function(result) {
                $log.error("No API data returned, check your internet connection or try later.");
            });

            return data;
        },
        queryDelete: function(url) {
            var URL = apiURL + url;
            var data = $http({
                method: 'DELETE',
                url: URL
            }).then(function(result) {
                $log.info("Delete operation successfull");
            }, function(result) {
                $log.error("Delete operation unsuccessfull");
            });

            return data;
        }
    }
    return factory;
}]);
