(function() {
  angular.module('casperApp').service('orderData', orderData);
  orderData.$inject=['$http','$window'];
  function orderData($http, $window) {
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

    let getHighlightSpecialLabels = function() {
      return $window.localStorage['highlight-special-labels'];
    }

    let setHighlightSpecialLabels = function(value) {
      $window.localStorage['highlight-special-labels'] = value;
    }

    formatDate = function(date) {
      return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
    }

    return {
      getOrders: getOrders,
      getPermLocs: getPermLocs,
      getSummary: getSummary,
      getHighlightSpecialLabels: getHighlightSpecialLabels,
      setHighlightSpecialLabels: setHighlightSpecialLabels
    };
  }
})();
