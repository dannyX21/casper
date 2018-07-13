(function () {
  angular.module('casperApp').service('sqsData', sqsData);
  sqsData.$inject = ['$http'];
  function sqsData($http) {
    const getPendingSQs = function() {
      return $http.get("/api/sqs");
    };
    return {
      getPendingSQs: getPendingSQs
    };
  }
})();
