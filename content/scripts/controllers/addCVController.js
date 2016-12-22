kandidatoApp.controller('addCvCtrl', function($scope, $rootScope, $location,  Upload, ApiDataFactory) {

    $scope.upload = function(files) {
        if (files && files.length) {

            for (var i = 0; i < files.length; i++) {
                var file = files[i];
                     ApiDataFactory.upload('resume/upload/list', file,     function(data, status, headers, config) {
                      //$route.reload();
                  } ).then(function(result) {console.log(result);});
            /* Upload.upload({
                    url: 'http://localhost:8080/recrutory/resume/upload/list',
                    file: file
                }).progress(function(evt) {
                    $scope.percentUpload = parseInt(100.0 * evt.loaded / evt.total);
                }).success(function(data, status, headers, config) {
                    $route.reload();
                }).error(function(data, status, headers, config) {
                    alert("Error, files not uploaded.")
                })*/
            }
        }
    };



});
