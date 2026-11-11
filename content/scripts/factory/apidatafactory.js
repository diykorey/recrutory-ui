'use strict';

kandidatoApp.factory('ApiDataFactory', ['$http', '$q', '$log', '$cookies', 'Upload', function($http, $q, $log, $cookies, Upload) {
//http://recrutory-web-dev.cloudapp.net:8080/recrutory/auth/linkedinAccessToken?code=AQQOM1ObnGUgWtQRo-o8g6AxtNnNYLxpWcWoc_J25pMAukVOV5EXpEJJn_sQFdFTp6msXzCCs9b3IlokXfdJGLsd63agzO77i0PQcsbDzOcxtNoVrQU&state=1234567890
//http://localhost:8080/recrutory/auth/linkedinAccessToken?code=AQQOM1ObnGUgWtQRo-o8g6AxtNnNYLxpWcWoc_J25pMAukVOV5EXpEJJn_sQFdFTp6msXzCCs9b3IlokXfdJGLsd63agzO77i0PQcsbDzOcxtNoVrQU&state=1234567890

    var apiURL = "http://localhost:8080/recrutory/";//"http://localhost:8080/recrutory/";//"http://recrutory-web-dev.cloudapp.net/"
    var authtoken = $cookies.get('auth-token');
    var cookies = $cookies.getAll();
    $log.info("authtoken = " + authtoken);
    $log.info("cookies = ",  cookies);
    $http.defaults.headers.common['Auth-Token'] = authtoken;
    var factory = {
        queryGet: function(url) {
            var URL = apiURL + url;
              $log.info("Execute GET request to " + URL);
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
            $log.info("Execute POST request to " + URL + " with data " + dataPost);
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
        queryPut: function(url, dataPut) {
            var URL = apiURL + url;
            //var dataPut= dataPut
            $log.info("Execute PUT request to " + URL + " with data " + dataPut);
            var data = $http({
                method: 'PUT',
                data: dataPut,
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
            $log.info("Execute DELETE request to " + URL);
            var data = $http({
                method: 'DELETE',
                url: URL
            }).then(function(result) {
                $log.info("Delete operation successfull");
            }, function(result) {
                $log.error("Delete operation unsuccessfull");
            });

            return data;
        },

        upload:function(url, files, onSuccess){
            var uploadUrl = apiURL + url;
            $log.info("Execute UPLOAD request to " + uploadUrl);
          var data =  Upload.upload({
                url: uploadUrl,
                file: files
            }).progress(function (evt) {
                var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                console.log('progress: ' + progressPercentage + '% ' + evt.config.file.name);

            }).success(function (data, status, headers, config) {
                console.log(data);
                onSuccess();
            }).error(function (data, status, headers, config) {
                console.log('error status: ' + status);
            });

            return data;
        }
    }
    return factory;
}]);
