(function () {
  angular.module('casperApp').controller('homeCtrl', homeCtrl);
  homeCtrl.$inject=['orderData' ,'$scope', '$routeParams'];
  function homeCtrl(orderData, $scope, $routeParams) {
    const vm = this;
    vm.pageHeader = {
      title: "Stewart Connector Systems"
    };

    vm.myOrderBy="promDate";
    vm.sortReverse=false;
    vm.filterOrder = {};
    vm.customer = {};
    vm.customers = [];
    vm.permLocs = [];
    vm.subSetData = [];
    vm.loading = true;
    vm.highlightSpecialLabels = false;

    vm.getPermLocs = function() {
      vm.selPermLoc = $routeParams.permLoc;
      return orderData.getPermLocs(vm.selPermLoc, vm.filterOrder.promDateFrom, vm.filterOrder.promDateTo).then(function(data) {
        vm.permLocs = data.data;
        vm.permLocs.sort();
        vm.permLocs.unshift('ALL');
        if(vm.selPermLoc) {
          vm.onSelPermLocChange();
        }
      }, function (err) {
        console.log(err);
      });
    };

    vm.getOrders = function() {
      vm.loading = true;
      return orderData.getOrders(vm.filterOrder.permLoc, vm.filterOrder.promDateFrom, vm.filterOrder.promDateTo).then(function(data) {
        vm.orders = data.data;        
        vm.customers = [];
        let dict = {};
        vm.orders.map(function(item) {
          dict[item.customerId] = item.customer;
        });
        for(let property in dict) {
          vm.customers.push({
            customerId: property,
            customer: dict[property]
          });
        }
        vm.customers.unshift({
          customer: "ALL"
        });
        vm.loading = false;
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

    vm.onSelCustomerChange = function() {
      vm.filterOrder.customerId = vm.selCustomer.customerId;
      vm.getTotal();
    };

    vm.onSelPermLocChange = function() {
      vm.filterOrder.permLoc = vm.selPermLoc === "ALL" ? undefined : vm.selPermLoc;
      vm.getTotal();
    };

    vm.getTotal = function() {
      setTimeout(function() {
        $scope.$apply(function() {
          vm.totQty = 0;
          vm.totPcs = 0;
          for(let c=0; c< vm.subSetData.length; c++) {
            vm.totQty += vm.subSetData[c].qtyOrdered;
            vm.totPcs += vm.subSetData[c].qtyPcs;
          }
        });
      }, 1000);
    };
    vm.getHighlightSpecialLabels = function() {
      vm.highlightSpecialLabels = orderData.getHighlightSpecialLabels()=="true" ? true : false;
    };
    vm.setHighlightSpecialLabels = function() {
      orderData.setHighlightSpecialLabels(vm.highlightSpecialLabels);
    };

    vm.getHighlightSpecialLabels();
    if($routeParams.promDateFrom && Date.parse($routeParams.promDateFrom)!== NaN) {
      vm.filterOrder.promDateFrom = new Date($routeParams.promDateFrom);
    }
    if($routeParams.promDateTo && Date.parse($routeParams.promDateTo)!== NaN) {
      vm.filterOrder.promDateTo = new Date($routeParams.promDateTo);
    }
    vm.getPermLocs().then(function() {
      vm.getOrders().then(function() {
        vm.getTotal();
      }, function(err) {
        console.log(err);
      });
    }, function(err) {
      console.log(err);
    });
  }
})();
