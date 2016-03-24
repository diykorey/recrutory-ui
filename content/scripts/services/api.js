kandidatoApp.service('api', function($http, $q, $cookies) {
    this.search = function(type, keyword) {
        var d = $q.defer();
        $http.get('http://recrutory-web-dev.cloudapp.net:8080/recrutory/search/' + type + '/byKeywords?query=' + keyword + '&page=0&size=10').then(function(response) {
            d.resolve(response);
        }, d.reject.bind(d));
        return d.promise;
    };
    this.positionStateForCadindate = function(data) {
        var d = $q.defer();
        $http.post('http://recrutory-web-dev.cloudapp.net:8080/recrutory/workflow/action', data).then(function(response) {
            d.resolve(response);
        }, d.reject.bind(d));
        return d.promise;
    };

    this.vacancyPagingFilter = function(name, email) {
      var url = "http://recrutory-web-dev.cloudapp.net:8080/recrutory/vacancy/paging?sortBy=name&sortDirection=ASC&page=0&size=10"
      if (name && name != '') {
      var nameFilter = "&name=" + name;
      url += nameFilter
      }
      if (email && email != '') {
        var emailFilter = "&email=" + email;
        url += emailFilter
      }
        var d = $q.defer();
        $http.get('scripts/mocks/vacancy_mock.json').then(function(response) {
            d.resolve(response);
        }, d.reject.bind(d));
        return d.promise;
    };

    this.candidatePagingFilter = function(name, email, sortBy) {
      var url = "http://recrutory-web-dev.cloudapp.net:8080/recrutory/candidate/paging?sortDirection=ASC&page=0&size=10"
      if (name && name != '') {
      var nameFilter = "&name=" + name;
      url += nameFilter
      }
      if (email && email != '') {
        var emailFilter = "&email=" + email;
        url += emailFilter
      }
      if (sortBy) {
        var nameFilter = "&sortBy=" + sortBy;
        url += nameFilter
      }
      else{
        var nameFilter = "&sortBy=name";
        url += nameFilter
      }
      console.log("Sort URL : " + url)
      var d = $q.defer();
      $http.get("scripts/mocks/candidate_mock.json").then(function(response) {
            d.resolve(response);
        }, d.reject.bind(d));
        return d.promise;
    };

    this.updateCandidateField = function(data) {
        var d = $q.defer();
        $http.post('http://recrutory-web-dev.cloudapp.net:8080/recrutory/candidate/' + data.id + '/updatefield', data).then(function(response) {
            d.resolve(response);
        }, d.reject.bind(d));
        return d.promise;
    };

    this.getCandidate = function(id) {
        var d = $q.defer();
        $http.get('http://recrutory-web-dev.cloudapp.net:8080/recrutory/candidate/' + id).then(function(response) {
            d.resolve(response);
        }, d.reject.bind(d));
        return d.promise;
    };


});
