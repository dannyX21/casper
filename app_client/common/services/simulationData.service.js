(function () {
  angular.module('casperApp').service('simulationData', simulationData);
  simulationData.$inject = ['$http'];
  function simulationData($http) {
    const getItemData = function(item) {
      return $http.get("/api/simulations/" + item);
    };
    const getItems = function() {
      return $http.get('/api/simulations/');
    };    
    return {
      getItems: getItems,
      getItemData: getItemData
    };
  }
})();
