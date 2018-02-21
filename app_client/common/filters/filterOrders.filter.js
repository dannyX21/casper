(function() {
  angular.module('casperApp').filter('filterOrders', filterOrders);
  function filterOrders () {
    return function(items, filterData){
      let result = [];
      try {
        items.forEach(function(item) {
          if(filterData.permLoc && item.permLoc!== filterData.permLoc) {
            return;
          }
          if(filterData.type && item.type!==filterData.type) {
            return;
          }
          if(filterData.po && item.po!=filterData.po) {
            return;
          }
          if(filterData.so && item.so!=filterData.so) {
            return;
          }
          if(filterData.pn) {
            if(!item.pn.includes(filterData.pn.toUpperCase())) {
              return;
            }
          }
          if(filterData.customerId && item.customerId!=filterData.customerId) {
            return;
          }
          if(filterData.promDateFrom && filterData.promDateTo) {
            let promDate = new Date(item.promDate);
            if(promDate < filterData.promDateFrom || promDate > filterData.promDateTo) {
              return;
            }
          } else if(filterData.promDateFrom) {
            let promDate = new Date(item.promDate);
            if(promDate < filterData.promDateFrom) {
              return;
            }
          } else if(filterData.promDateTo) {
            let promDate = new Date(item.promDate);
            if(promDate > filterData.promDateTo) {
              return;
            }
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
