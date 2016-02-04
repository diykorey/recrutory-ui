kandidatoApp.controller('addCandidate', function($scope, $rootScope, $location, ApiDataFactory, $log, Upload) {




    $scope.candidate = {
        tags: [],
        fields: [{
                "type": {
                    "name": "NAME_SURNAME",
                    "priorityGroup": 1,
                    "priority": 1
                },

                "fieldValue": ""
            }

        ]
    }

    ApiDataFactory.queryGet('candidate/findFieldTypes').then(function(result) {
        $rootScope.updateProcess = false;
        $scope.fieldTypes = result;
        console.log($scope.fieldTypes)
    });

    $scope.addCandidate = function() {

        $rootScope.updateProcess = true
        var URL = "candidate/create";
        ApiDataFactory.queryPost(URL, $scope.candidate).then(function(result) {
            delete $scope.candidate;
            $rootScope.updateProcess = false;
        })
    }



    $scope.upload = function (files) {
        if (files && files.length) {
            for (var i = 0; i < files.length; i++) {
                var file = files[i];
                Upload.upload({
                    url: 'http://recrutory-web-dev.cloudapp.net:8080/recrutory/resume/upload/one',
                    file: file
                }).progress(function (evt) {
                    var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                    console.log('progress: ' + progressPercentage + '% ' + evt.config.file.name);

                }).success(function (data, status, headers, config) {
                    console.log(data);
                    $scope.addCandidate()
                }).error(function (data, status, headers, config) {
                    console.log('error status: ' + status);
                })
            }
        }
    };

});
