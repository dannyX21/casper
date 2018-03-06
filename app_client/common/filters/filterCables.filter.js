(function() {
  angular.module('casperApp').filter('filterCables', filterCables);
  function filterCables () {
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
          if(filterData.type && filterData.type !== "ALL" && item.type!==filterData.type) {
            return;
          }
          if(filterData.mfr && filterData.mfr !== "ALL" && item.mfr!=filterData.mfr) {
            return;
          }
          if(filterData.shield && filterData.shield !== "ALL" && item.shield!=filterData.shield) {
            return;
          }
          if(filterData.color && filterData.color !== "ALL" && item.color!=filterData.color) {
            return;
          }
          if(filterData.legend && filterData.legend !=="ALL" && item.legend!=filterData.legend) {
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
