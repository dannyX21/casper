(function() {
  angular.module('casperApp').controller('materialsCtrl', materialsCtrl);
  materialsCtrl.$inject=['materialData'];
  function materialsCtrl(materialData) {
    const vm = this;
    vm.filterCable = {};
    vm.filterComp = {};

    vm.getComponents = function() {
      return materialData.getComponents().then(function(data) {
        vm.components = data.data;
        let depts = new Set();
        vm.components.forEach(function(item) {
          depts.add(item.dept);
          if(item.details[0]) {
            item.short = item.details[0].balance < item.ss;
            item.active = item.details[0].usageMonth > 0;
          }
        });
        vm.compDepts = [...depts];
        vm.compDepts.sort();
        vm.compDepts.unshift('ALL');
        vm.filterComp.dept = "ALL";
      }, function(err) {
        console.log(err);
      });
    };

    vm.getCables = function() {
      return materialData.getCables().then(function(data) {
        vm.cables = data.data;
        let depts = new Set();
        let mfrs = new Set();
        let types = new Set();
        let shields = new Set();
        let colors = new Set();
        let legends = new Set();
        vm.cables.forEach(function(item) {
          depts.add(item.dept);
          mfrs.add(item.mfr);
          types.add(item.type);
          shields.add(item.shield);
          colors.add(item.color);
          legends.add(item.legend);
          if(item.details[0]) {
            item.short = item.details[0].balance < item.ss;
            item.active = item.details[0].usageMonth > 0;
          }
        });
        vm.depts = [...depts];
        vm.depts.sort();
        vm.depts.unshift("ALL");
        vm.filterCable.dept = "ALL";
        vm.mfrs = [...mfrs];
        vm.mfrs.sort();
        vm.mfrs.unshift("ALL");
        vm.filterCable.mfr= "ALL";
        vm.types = [...types];
        vm.types.sort();
        vm.types.unshift("ALL");
        vm.filterCable.type = "ALL";
        vm.shields = [...shields];
        vm.shields.sort();
        vm.shields.unshift("ALL");
        vm.filterCable.shield = "ALL";
        vm.colors = [...colors];
        vm.colors.sort();
        vm.colors.unshift("ALL");
        vm.filterCable.color = "ALL";
        vm.legends = [...legends];
        vm.legends.sort();
        vm.legends.unshift("ALL");
        vm.filterCable.legend = "ALL";
      }, function (err) {
        console.log(err);
      });
    };

    vm.orderByMe = function(colName) {
      if(colName === vm.myOrderBy) {
        vm.sortReverse = !vm.sortReverse;
      }
      vm.myOrderBy = colName;
    };

    vm.orderCompByMe = function(colName) {
      if(colName === vm.myCompOrderBy) {
        vm.compSortReverse = !vm.compSortReverse;
      }
      vm.myCompOrderBy = colName;
    };

    vm.getCables();
    vm.getComponents();
  }
})();
