(function() {
  angular.module('casperApp').controller('mrpCtrl', mrpCtrl);
  mrpCtrl.$inject=['mrpData'];
  function mrpCtrl(mrpData) {
    const vm = this;
    vm.myOrderBy="qtyMissing";
    vm.sortReverse=true;
    vm.filterMats = {
      stockStatus: "0"
    };

    vm.types = [
      {
        id: 0,
        type: "ALL"
      },
      {
        id: 1,
        type: "Purchased"
      },
      {
        id: 2,
        type: "Transfer"
      },
      {
        id: 3,
        type: "Subassy"
      }
    ];

    vm.getMRP = function() {
      mrpData.getMRP().then(function(data) {
        vm.materials = data.data;
        vm.materials.forEach(function(item) {
          if(item.trans_items.length>0){
            item.type="Transfer";
            return;
          } else if (item.subassy_items.length > 0) {
            item.type = "Subassy";
            return;
          } else {
            item.type = "Purchased";
          }
        });
      }, function (err) {
        console.log(err);
      });
    }
    vm.orderByMe = function(colName) {
      if(colName === vm.myOrderBy) {
        vm.sortReverse = !vm.sortReverse;
      }
      vm.myOrderBy = colName;
      console.log(vm.myOrderBy);
    };

    vm.onSelTypeChange = function() {
      vm.filterMats.type = vm.selType.type == "ALL" ? undefined : vm.selType.type;
      console.log(vm.filterMats.type);
    }

    vm.getMRP();
  }
})();
