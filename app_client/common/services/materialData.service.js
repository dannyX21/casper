(function () {
  angular.module('casperApp').service('materialData', materialData);
  materialData.$inject = ['$http'];
  function materialData($http) {
    const getCables = function() {
      return $http.get("/api/materials/cables");
    };
    const getComponents = function() {
      return $http.get("/api/materials/components");
    };
    return {
      getCables: getCables,
      getComponents: getComponents
    };
  }  
})();
