(function() {
  angular.module('casperApp').service('mrpData', mrpData);
  mrpData.$inject = ['$http'];
  function mrpData($http) {
    let getMRP = function() {
      return $http.get("/api/mrp");
    };

    return {
      getMRP: getMRP
    };
  }
})();
