kandidatoApp.service('api', function($http, $q, $cookies, ApiDataFactory) {
//  var apiURL = "http://localhost:8080/recrutory/";
//  var authtoken = $cookies.get('authtoken');
//  $http.defaults.headers.common['Auth-Token'] = authtoken;

    this.search = function(type, keyword) {
        var d = $q.defer();
      /*  $http.get(apiURL + '/search/' + type + '/byKeywords?query=' + keyword + '&page=0&size=10').then(function(response) {
            d.resolve(response);
        }, d.reject.bind(d));*/
        ApiDataFactory.queryGet('/search/' + type + '/byKeywords?query=' + keyword + '&page=0&size=10').then(function(response) {
            d.resolve(response);
        }, d.reject.bind(d));
        return d.promise;
    };
    this.positionStateForCadindate = function(data) {
        var d = $q.defer();
        ApiDataFactory.queryPost('/workflow/action', data).then(function(response) {
            d.resolve(response);
        }, d.reject.bind(d));

      /*  $http.post(apiURL + '/workflow/action', data).then(function(response) {
            d.resolve(response);
        }, d.reject.bind(d));*/
        return d.promise;
    };

    this.vacancyPagingFilter = function(name, email) {
      var url = apiURL +  "/vacancy/paging?sortBy=name&sortDirection=ASC&page=0&size=10"
      if (name && name != '') {
      var nameFilter = "&name=" + name;
      url += nameFilter
      }
      if (email && email != '') {
        var emailFilter = "&email=" + email;
        url += emailFilter
      }
        var d = $q.defer();
      /*  $http.get('scripts/mocks/vacancy_mock.json').then(function(response) {
            d.resolve(response);
        }, d.reject.bind(d));*/

        ApiDataFactory.queryGet('scripts/mocks/vacancy_mock.json').then(function(response) {
            d.resolve(response);
        }, d.reject.bind(d));

        return d.promise;
    };

    this.candidatePagingFilter = function(name, email, sortBy) {
      var url =  apiURL +  "/candidate/paging?sortDirection=ASC&page=0&size=10"
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
    /*  $http.get("scripts/mocks/candidate_mock.json").then(function(response) {
            d.resolve(response);
        }, d.reject.bind(d));*/

        ApiDataFactory.queryGet("scripts/mocks/candidate_mock.json").then(function(response) {
            d.resolve(response);
        }, d.reject.bind(d));

        return d.promise;
    };

    this.updateCandidateField = function(data) {
        var d = $q.defer();
      /*  $http.post(apiURL + '/candidate/' + data.id + '/updatefield', data).then(function(response) {
            d.resolve(response);
        }, d.reject.bind(d));*/

        ApiDataFactory.queryPost('/candidate/' + data.id + '/updatefield', data).then(function(response) {
            d.resolve(response);
        }, d.reject.bind(d));

        return d.promise;
    };

    this.getCandidate = function(id) {
        var d = $q.defer();
        /*$http.get(apiURL + '/candidate/' + id).then(function(response) {
            d.resolve(response);
        }, d.reject.bind(d));*/

        ApiDataFactory.queryGet('candidate/' + id).then(function(response) {
            d.resolve(response);
        }, d.reject.bind(d));

        return d.promise;
    };


});
