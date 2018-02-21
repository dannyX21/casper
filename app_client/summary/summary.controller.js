(function() {
  angular.module("casperApp").controller('summaryCtrl', summaryCtrl);
  summaryCtrl.$inject = ['orderData','$scope'];
  function summaryCtrl(orderData, $scope) {
    const vm = this;
    vm.weeks = [];

    vm.getMonday = () => {
      let today = new Date();
      today.setDate(today.getDate()-(today.getDay()));
      return today;
    };

    vm.addDays = (date, days) => {
      let d = new Date(date);
      d.setDate(date.getDate() + days);
      return d;
    };

    vm.getPermLocs = () => {
      return orderData.getPermLocs().then((data) => {
        vm.permLocs = data.data;
      }, (err) => {
        console.log(err);
      });
    };

    vm.addWeeks = () => {
      let prom = [], dates = [];
      for(let c=0; c<8; c++) {
        dates.push({
          promDateFrom: vm.monday,
          promDateTo: vm.friday
        });
        prom.push(orderData.getSummary(vm.monday, vm.friday));
        vm.monday = vm.addDays(vm.monday, 7);
        vm.friday = vm.addDays(vm.friday, 7);
      }
      Promise.all(prom).then((results) => {
        for(let c=0; c<8; c++) {
          let summary = vm.permLocs.map((item, index) => {
            let totOrders = 0;
            let totPcs = 0;
            for(let x = 0; x < results[c].data.length; x++) {
              if(results[c].data[x]._id === item) {
                totOrders = results[c].data[x].totOrders;
                totPcs = results[c].data[x].totPcs;
                break;
              }
            }
            return {
              _id: item,
              totOrders: totOrders,
              totPcs: totPcs
            }
          });
          let week = {
            promDateFrom: dates[c].promDateFrom,
            promDateTo: dates[c].promDateTo,
            summary: summary
          }
          vm.weeks.push(week);
        }
        $scope.$apply(() => {
          vm.weeks;
        });
      })
      .catch((err) => {
         console.log(err);
       });
    };
    vm.permLocs = [];
    vm.monday = vm.getMonday();
    vm.friday = vm.addDays(vm.monday, 6);
    vm.getPermLocs().then(()=> {
      vm.addWeeks();
    }, (err) => {
      console.log(err);
    });
  }
})();
