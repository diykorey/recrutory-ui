kandidatoApp.controller('candidateListCtrl', function($scope, $rootScope, $log, ApiDataFactory, $timeout, $sce, $q, $location, debounce, api) {

  $rootScope.prevLocation = $location.path();

  $scope.candidateTableItems = [
    'Name',
    'Mail',
    'Skype',
    'Phone',
    'Address',
    'CV',
    'Date'
  ]

  var currentFilters = {}

  function filterListRequest(name, email) {

    currentFilters.name = name;
    currentFilters.email = email;

    if ($scope.sortBy) {
      var type = $scope.sortBy;
    }

    if (name != "" && name || email != "" && email || type) {
      api.candidatePagingFilter(name, email, type).then(function(data) {
        $scope.$broadcast("listFilterSearch", data.data)
      })
    } else {
      $scope.$broadcast("listFilterSearch", false)
    }
  }

  var debounceSearch = debounce(500, function(name, email, type) {

    filterListRequest(name, email, type)

  });

  $scope.filterList = {
    byName: function(name, email) {
      debounceSearch(name, email)
    },
    byEmail: function(name, email) {
      debounceSearch(name, email)
    }
  }


  $scope.orderByVals = {}


  $scope.setOrder = function(item) {

    if ($scope.orderVal && $scope.orderVal.active == item) {
      delete $scope.orderVal;
      $scope.sortBy = false;

    } else {
      $scope.orderVal = {}

      $scope.orderVal.active = item

  $scope.sortBy =  $scope.orderVal.active;
      item = item.toLowerCase()

      $scope.orderVal.filter = "summaryCard.predefinedFields." + item.toUpperCase() + ".fieldValue"

      switch (item) {
        case "name":
          $scope.orderVal.filter = "summaryCard.predefinedFields.NAME_SURNAME.fieldValue";
          break;
        case "mail":
          $scope.orderVal.filter = "summaryCard.predefinedFields.EMAIL.fieldValue";
          break;
        case "date":
          $scope.orderVal.filter = "candidate.createTime";
          break;
      }

    }
    filterListRequest(false, false)

  }



});
