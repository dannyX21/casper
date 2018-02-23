(function() {
  angular.module('casperApp').filter('filterMRP', filterMRP);
  function filterMRP () {
    return function(items, filterData){
      let result = [];
      try {
        items.forEach(function(item) {
          if(filterData.type && item.type!==filterData.type) {
            return;
          }
          if(filterData.pn) {
            if(!item.pn.includes(filterData.pn.toUpperCase())) {
              return;
            }
          }
          if(filterData.stockStatus && filterData.stockStatus === "1" && item.balance >= 0) {
            return;
          }
          result.push(item);
        });
        return result;
      } catch(err) {
        //console.log(err);
      }
    };
  }
})();
