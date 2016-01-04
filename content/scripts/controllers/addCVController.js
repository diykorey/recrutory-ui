kandidatoApp.controller('addCvCtrl', function($scope, $rootScope, $location, Upload) {

    $scope.upload = function(files) {
        if (files && files.length) {

            for (var i = 0; i < files.length; i++) {
                var file = files[i];
                Upload.upload({
                    url: 'http://recrutory-web-dev.cloudapp.net:8080/recrutory/resume/upload/list',
                    file: file
                }).progress(function(evt) {
                    $scope.percentUpload = parseInt(100.0 * evt.loaded / evt.total);
                }).success(function(data, status, headers, config) {
                    $route.reload();
                }).error(function(data, status, headers, config) {
                    alert("Error, files not uploaded.")
                })
            }
        }
    };



});
