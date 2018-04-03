(function() {
  angular.module("casperApp").service("evaluationData", evaluationData);
  evaluationData.$inject =['$http'];
  function evaluationData($http) {
    const getPeriods = function() {
      return $http.get('/api/periods');
    };

    const getEvaluation = function(period) {
      return $http.get('/api/vendors/evaluations/' + period);
    }

    return {
      getPeriods: getPeriods,
      getEvaluation: getEvaluation
    };
  }  
})();
