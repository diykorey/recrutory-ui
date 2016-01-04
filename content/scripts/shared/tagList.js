
kandidatoApp.directive('tagList', function() {
  return {
      restrict: 'E',
      replace: 'true',
      templateUrl: 'views/shared/tagList.html',
       scope: {
      tags: '='
    },
    link: function(scope, element) {
    }
  };
});
