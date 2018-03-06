(function() {
  angular.module('casperApp').filter('filterComponents', filterComponents);
  function filterComponents () {
    return function(items, filterData){
      let result = [];
      try {
        items.forEach(function(item) {
          if(filterData.pn) {
            if(!item.pn.includes(filterData.pn.toUpperCase())) {
              return;
            }
          }
          if(filterData.dept && filterData.dept !== "ALL"  && item.dept!== filterData.dept) {
            return;
          }
          if(filterData.active && !item.active) {
            return;
          }
          if(filterData.shortsOnly && !item.short) {
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
