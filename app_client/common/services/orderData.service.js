(function() {
  angular.module('casperApp').service('orderData', orderData);
  orderData.$inject=['$http'];
  function orderData($http) {
    let getOrders = function(permLoc, promDateFrom, promDateTo) {
      let query = '/api/orders/?';
      if(permLoc) {
        query += "permLoc=" + permLoc + "&";
      }
      if(promDateFrom) {
        query+= "promDateFrom=" + promDateFrom.toDateString() + "&";
      }
      if(promDateTo) {
        query+= "promDateTo=" + promDateTo.toDateString() + "&";
      }
      console.log("service query: " + query);
      return $http.get(query);
    };

    let getPermLocs = function(permLoc, promDateFrom, promDateTo) {
      let query = '/api/permLocs/?';
      if(permLoc) {
        query += "permLoc=" + permLoc + "&";
      }
      if(promDateFrom) {
        query+= "promDateFrom=" + promDateFrom.toDateString() + "&";
      }
      if(promDateTo) {
        query+= "promDateTo=" + promDateTo.toDateString() + "&";
      }
      return $http.get(query);
    };

    let getSummary = function(promDateFrom, promDateTo) {
      return $http.get("/api/summary?promDateFrom=" + formatDate(promDateFrom) + "&promDateTo=" + formatDate(promDateTo));
    }

    formatDate = function(date) {
      return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
    }

    return {
      getOrders: getOrders,
      getPermLocs: getPermLocs,
      getSummary: getSummary
    };
  }
})();
