(function() {
  angular.module('casperApp').controller('simulationCtrl', simulationCtrl);
  simulationCtrl.$inject = ['simulationData', '$routeParams', '$timeout', '$window', '$location'];
  function simulationCtrl(simulationData, $routeParams, $timeout, $window, $location) {
    const vm = this;
    vm.data = [];
    d = new Date();
    d.setDate (d.getDate() - 365);
    vm.chartData = [];

    vm.params = {
      startDate: d,
      leadTime: 0,
      predictionMethod: "d",
      initialInventoryWeeks: 0,
      initialInventory: 0,
      safetyStockWeeks: 0,
      initialSafetyStock: 0,
      maxInventoryWeeks: 0,
      initialMaxInventory: 0,
      idealInventoryPctg: 70,
      idealInventoryWeeks: 0,
      initialIdealInventory: 0,
      orderFrequency: 1,
      minOrderMultiple: 1,
      moq: 1,
      monthIndexStart : 0,
      randomPctg: 0,
      roundTo: 1
    };
    vm.predictionMethods = {
      "d": "Dynamic",
      "12m": "12 Months",
      "6m": "6 Months",
      "3m": "3 Months",
      "2m": "2 Months",
      "m": "Mixed"
    };
    vm.stats = {
      qtyOH: {},
      qtyOnOrder: {},
      qtyConsumed: {},
      weeksAvailable: {}
    };
    vm.magnitudes = [1,10,100,1000,10000,100000];
    vm.getItems = function() {
      return simulationData.getItems().then(function(data) {
        vm.items = [];
        data.data.map(function(i){
          vm.items.push(i.pn);
        });
      }, function(err){
        console.log(err);
      })
    };
    vm.getRouteParams = function() {
      if($routeParams.params){
        let params = JSON.parse($routeParams.params);
        params.startDate = new Date(params.startDate);
        vm.params.pn=params.pn;
        vm.pn = params.pn;
        vm.params.startDate = params.startDate;
        vm.params.leadTime = params.leadTime;
        vm.params.predictionMethod = params.predictionMethod;
        vm.params.initialInventoryWeeks = params.initialInventoryWeeks;
        vm.params.safetyStockWeeks = params.safetyStockWeeks;
        vm.params.maxInventoryWeeks = params.maxInventoryWeeks;
        vm.params.idealInventoryPctg = params.idealInventoryPctg;
        vm.params.orderFrequency = params.orderFrequency;
        vm.params.minOrderMultiple = params.minOrderMultiple;
        vm.params.moq = params.moq;
        vm.params.randomPctg = params.randomPctg;
        vm.params.roundTo = params.roundTo;
        vm.fromRouteParams = true;
        vm.onPNChange().then(function(){
          vm.runSimulation();
        });

      } else {
        vm.fromRouteParams = false;
      }
    };
    vm.onPNChange = function() {
      return vm.getItemData().then(function(){
        if(!vm.fromRouteParams){
          const params = vm.getParamsFromLocalStorage(vm.item.pn);
          if (params!=undefined) {
            vm.params = params;
          } else {
            vm.params.leadTime = vm.item.lt+vm.item.tt;
            vm.params.safetyStockWeeks = vm.item.lt + vm.item.tt;
            vm.params.initialInventoryWeeks = vm.params.safetyStockWeeks;
            vm.params.maxInventoryWeeks = Math.round(vm.params.safetyStockWeeks*1.5);
            vm.params.predictionMethod="d";
          }
        }
        vm.prediction = {
          "12m":calcXMonthsPrediction(vm.item.history,12),
          "6m":calcXMonthsPrediction(vm.item.history,6),
          "3m":calcXMonthsPrediction(vm.item.history,3),
          "2m":calcXMonthsPrediction(vm.item.history,2),
          "m":calcMixPrediction(vm.item.history)
        };
        vm.calcErrorRates(vm.prediction);
        vm.onStartDateChange();
      }, function(err) {
        console.log(err);
      });
    };
    vm.rootMeanSquare = function(p,until) {
      let sum = 0;
      let limit = until == undefined ? p.length : until;
      for(let i=0;i<limit;i++){
        sum+=Math.pow(p[i]-(vm.item.history[i+1]/4.33333),2)
      }
      return Math.sqrt(sum/limit);
    };
    vm.calcErrorRates = function(predictions) {
      vm.errorRates={};
      for(prediction in predictions) {
        vm.errorRates[prediction] = vm.rootMeanSquare(predictions[prediction]);
      }
    };
    function historyMonths(history, startMonth) {
      vm.historyMonths = [];
      let d = new Date(startMonth.getFullYear(), startMonth.getMonth(), startMonth.getDate(),0,0,0,0);
      for(let m = 0;m<history.length; m++) {
        vm.historyMonths.push(d);
        if(d.getMonth()==11) {
          d = new Date(d.getFullYear()+1, 0, 1,0,0,0,0);
        } else {
          d = new Date(d.getFullYear(), d.getMonth()+1,1,0,0,0,0);
        }
      }
    }
    vm.getItemData = function() {
      return simulationData.getItemData(vm.pn).then(function(data) {
        vm.item = data.data;
        vm.item.startMonth = new Date(2016,3,1,0,0,0,0);
        historyMonths(vm.item.history, vm.item.startMonth);
      }, function(err) {
        console.log(err);
      });
    };

    vm.hideSeries = function(selectedItem) {
      let col = selectedItem.column;
      if(selectedItem.row == null) {
        if(vm.chartObject.view.columns[col]==col) {
          vm.chartObject.view.columns[col] = {
            label: vm.chartObject.data.cols[col].label,
            type: vm.chartObject.data.cols[col].type,
            calc: function() {
              return null;
            }
          };
          vm.chartObject.options.colors[col -1] = "#CCCCCC";
        } else {
          vm.chartObject.view.columns[col] = col;
          vm.chartObject.options.colors[col-1] = vm.chartObject.options.defaultColors[col-1];
        }
      }
    };
    vm.getParamsFromLocalStorage = function(pn) {
      let params = $window.localStorage["sim_" + pn];
      if(params!=undefined) {
        params = JSON.parse(params);
        params.startDate = new Date(params.startDate);
      }
      return params;
    }

    vm.setParamsInLocalStorage = function() {
      const params = {
        pn: vm.item.pn,
        startDate: vm.params.startDate,
        leadTime: vm.params.leadTime,
        predictionMethod: vm.params.predictionMethod,
        initialInventoryWeeks: vm.params.initialInventoryWeeks,
        safetyStockWeeks: vm.params.safetyStockWeeks,
        maxInventoryWeeks: vm.params.maxInventoryWeeks,
        idealInventoryPctg: vm.params.idealInventoryPctg,
        orderFrequency: vm.params.orderFrequency,
        minOrderMultiple: vm.params.minOrderMultiple,
        moq: vm.params.moq,
        randomPctg: vm.params.randomPctg,
        roundTo: vm.params.roundTo
      };
      $window.localStorage['sim_' + params.pn] = JSON.stringify(params);
      vm.share = $location.absUrl().split('?')[0] + '?params='+ encodeURIComponent(JSON.stringify(params));
    };

    function calcXMonthsPrediction(history, months) {
      prediction = [];
      suma = 0;
      avg = 0;
      for(i = 1; i<history.length; i++) {
        suma += history[i-1];
        if(i < months + 1) {
          avg = suma/i;
        } else {
          suma -= history[i-(months+1)];
          avg = suma/months;
        }
        prediction.push(avg/4.33333);
      }
      return prediction;
    }

    function calcMixPrediction(history) {
      prediction = [];
      suma = 0;
      avg = 0;

      for(i = 0; i<3; i++) {
        suma += history[i];
        avg = suma/(i+1);
        prediction.push(avg/4.33333);
      }
      suma3mo = suma;
      for(i = 3; i< history.length-1; i++) {
        suma += history[i];
        suma3mo += history[i]-history[i-3];
        avg = (0.6*suma3mo/3)+(0.4*suma/(i+1));
        prediction.push(avg/4.33333);
      }
      return prediction;
    }

    function updateStats(sim) {
      updateItemStats(vm.stats.qtyOH, sim.qtyOH);
      updateItemStats(vm.stats.qtyConsumed, sim.qtyConsumed);
      updateItemStats(vm.stats.qtyOnOrder, sim.qtyOnOrder);
      if(sim.qtyOnOrder>0) {
        vm.stats.qtyOnOrder.count++;
      }
      updateItemStats(vm.stats.weeksAvailable, sim.weeksAvailable);
    }
    function updateItemStats(item, value) {
      item.sum += value;
      if(value<item.min) {
        item.min = value;
      } else if (value> item.max) {
        item.max = value;
      }
    }
    vm.onPredictiveMethodChange = function() {
      vm.onParamsChange();
    };
    vm.onStartDateChange = function() {
      month = 3;
      year = 2016;
      index = 0;
      d = new Date(year,month,1,23,59,59,999);
      vm.params.monthIndexStart = 0;
      while(d.getFullYear() < vm.params.startDate.getFullYear() || d.getMonth() < vm.params.startDate.getMonth()) {
        month ++;
        if (month == 12) {
          year ++;
          month = 0;
        }
        d = new Date(year,month,1,23,59,59,999);
        index ++;
      }
      vm.params.monthIndexStart = index < 1 ? 0 : index - 1;
      vm.onParamsChange();
    };
    vm.onParamsChange = function() {
      let predictionMethod = vm.params.predictionMethod == "d"? vm.item.method : vm.params.predictionMethod;
      vm.params.initialInventory = Math.round(vm.prediction[predictionMethod][vm.params.monthIndexStart]*vm.params.initialInventoryWeeks);
      vm.params.initialSafetyStock = Math.round(vm.prediction[predictionMethod][vm.params.monthIndexStart]*vm.params.safetyStockWeeks);
      vm.params.initialMaxInventory = Math.round(vm.prediction[predictionMethod][vm.params.monthIndexStart]*vm.params.maxInventoryWeeks);
      vm.params.idealInventoryWeeks = ((vm.params.safetyStockWeeks + ((vm.params.maxInventoryWeeks - vm.params.safetyStockWeeks)*(vm.params.idealInventoryPctg/100)))*100)/100;
      vm.params.initialIdealInventory = Math.round(vm.prediction[predictionMethod][vm.params.monthIndexStart]*vm.params.idealInventoryWeeks);
    };
    vm.getBestPredictiveMethod = function(until) {
      let min = Infinity;
      let best_method = "";
      for(method in vm.prediction) {
        let rmse = vm.rootMeanSquare(vm.prediction[method], until);
        if(rmse < min) {
          min = rmse;
          best_method = method;
        }
      }
      return best_method;
    }
    vm.runSimulation = function(){
      vm.setParamsInLocalStorage();

      vm.data = [];
      let onOrder = [];
      vm.chartData = [];
      let sumOnOrder = 0;
      vm.initStats();
      let monthIndex = vm.params.monthIndexStart;
      let predictionMethod = vm.params.predictionMethod == "d" ? vm.getBestPredictiveMethod(monthIndex) : vm.params.predictionMethod;
      let predictedWeeklyDemand = vm.prediction[predictionMethod][monthIndex];
      let weeklyConsumption = vm.item.history[monthIndex+1]/4.33333;
      let randomPctg = vm.params.randomPctg/100;
      let sim = {
        week: 1,
        date: new Date(vm.params.startDate),
        qtyOH: vm.params.initialInventory,
        oHValue: vm.params.initialInventory * vm.item.up,
        qtyConsumed: randomPctg == 0 ? weeklyConsumption : weeklyConsumption +(weeklyConsumption * ((randomPctg * 2 * Math.random())-randomPctg)),
        qtyOnOrder: 0,
        qtyToOrder: 0,
        qtyDelivered: 0,
        balance: 0,
        weeksAvailable: 0,
        onHand_onOrder: 0,
        currentSS: vm.params.roundTo == 1 ? vm.params.safetyStockWeeks * predictedWeeklyDemand : Math.ceil(vm.params.safetyStockWeeks * predictedWeeklyDemand/vm.params.roundTo)*vm.params.roundTo,
        idealStock: vm.params.idealInventoryWeeks * predictedWeeklyDemand,
        maxStock: vm.params.maxInventoryWeeks * predictedWeeklyDemand
      };
      sim.balance = sim.qtyOH -sim.qtyConsumed +sim.qtyDelivered;
      sim.onHand_onOrder = sim.balance + sim.qtyOnOrder;
      sim.weeksAvailable = sim.balance/predictedWeeklyDemand;
      sim.predictionMethod = predictionMethod;

      if(sim.onHand_onOrder<sim.currentSS || (sim.week%vm.params.orderFrequency==0 && sim.onHand_onOrder < sim.idealStock)){
        if(vm.params.moq > sim.idealStock - sim.onHand_onOrder) {
          sim.qtyToOrder = vm.params.moq;
        } else {
          sim.qtyToOrder = Math.ceil((sim.idealStock - sim.onHand_onOrder)/vm.params.minOrderMultiple)*vm.params.minOrderMultiple;
        }
        onOrder.push({
          qty: sim.qtyToOrder,
          deliver: sim.week + vm.params.leadTime + 1
        });
        sumOnOrder += sim.qtyToOrder;
      } else {
        sim.qtyToOrder = 0;
      }
      copy = JSON.parse(JSON.stringify(sim));
      vm.data.push(copy);
      vm.chartData.push({ c: [
        { v: copy.week, f: shortDateString(copy.date)},
        { v: copy.qtyOH},
        { v: copy.qtyConsumed},
        { v:copy.qtyOnOrder },
        {v: copy.currentSS },
        {v: copy.idealStock },
        {v: copy.maxStock }
      ]});
      updateStats(copy);
      const limit=new Date(2018,3,23,0,0,0,0);
      while(sim.date < limit) {
        month = sim.date.getMonth();
        sim.date.setDate(sim.date.getDate()+7);
        if(month!=sim.date.getMonth()) {
          monthIndex++;
          predictedWeeklyDemand = vm.prediction[predictionMethod][monthIndex];
          weeklyConsumption = vm.item.history[monthIndex+1]/4.33333;
          sim.predictionMethod = vm.params.predictionMethod == "d" ? vm.getBestPredictiveMethod(monthIndex) : vm.params.predictionMethod;
        }
        sim.week += 1;
        sim.qtyOH = sim.balance;
        sim.oHValue = sim.qtyOH * vm.item.up;
        sim.qtyConsumed = randomPctg == 0 ? weeklyConsumption : weeklyConsumption +(weeklyConsumption * ((randomPctg * 2 * Math.random())-randomPctg));
        if(sumOnOrder>0 && onOrder[0].deliver == sim.week) {
          sim.qtyDelivered = onOrder[0].qty;
          onOrder.shift();
          sumOnOrder-=sim.qtyDelivered;
        } else {
          sim.qtyDelivered = 0;
        }
        sim.qtyOnOrder = sumOnOrder;
        sim.balance = sim.qtyOH - sim.qtyConsumed + sim.qtyDelivered;
        sim.onHand_onOrder = sim.balance + sim.qtyOnOrder;
        sim.weeksAvailable = sim.balance/predictedWeeklyDemand;
        sim.currentSS = vm.params.roundTo == 1 ? vm.params.safetyStockWeeks * predictedWeeklyDemand : Math.ceil(vm.params.safetyStockWeeks * predictedWeeklyDemand/vm.params.roundTo)*vm.params.roundTo;
        sim.idealStock = vm.params.idealInventoryWeeks * predictedWeeklyDemand;
        sim.maxStock = vm.params.maxInventoryWeeks * predictedWeeklyDemand;
        if(sim.onHand_onOrder<sim.currentSS || (sim.week%vm.params.orderFrequency == 0 && sim.onHand_onOrder < sim.idealStock)){
          if(vm.params.moq > sim.idealStock - sim.onHand_onOrder) {
            sim.qtyToOrder = vm.params.moq;
          } else {
            sim.qtyToOrder = Math.ceil((sim.idealStock - sim.onHand_onOrder)/vm.params.minOrderMultiple)*vm.params.minOrderMultiple;
          }
          onOrder.push({
            qty: sim.qtyToOrder,
            deliver: sim.week + vm.params.leadTime + 1
          });
          sumOnOrder += sim.qtyToOrder;
        } else {
          sim.qtyToOrder = 0;
        }
        copy = JSON.parse(JSON.stringify(sim));
        vm.data.push(copy);
        vm.chartData.push({ c: [
          {v: copy.week, f: shortDateString(copy.date)},
          {v: copy.qtyOH},
          {v: copy.qtyConsumed},
          {v:copy.qtyOnOrder },
          {v: copy.currentSS },
          {v: copy.idealStock },
          {v: copy.maxStock }
        ]});
        updateStats(copy);
      }
      vm.drawChart();
      const textShare = document.getElementById("textShare");
      textShare.select();
    };
    function shortDateString(date) {
      return date.substring(5,7)+"/"+date.substring(8,10)+"/"+date.substring(0,4);
    }

    vm.drawChart = function() {
      vm.chartObject = {
        type: "LineChart",
        displayed: false,
        data: {
          cols: [
            {
              id: "week",
              label: "Week",
              type: "number"
            },
            {
              id: "qtyOH",
              label: "Qty OH",
              type: "number"
            },
            {
              id: "demand",
              label: "Demand",
              type: "number"
            },
            {
              id: "onOrder",
              label: "On Order",
              type: "number"
            },
            {
              id: "currentSS",
              label: "Current SS",
              type: "number"
            },
            {
              id: "ideal",
              label: "Ideal Stock",
              type: "number"
            },
            {
              id: "max",
              label: "Max Stock",
              type: "number"
            }
          ],
          rows: vm.chartData
        },
        options: {
          "title": "Simulation",
          "colors": ['#0093D0', '#800000','#FF66CC', '#FF9900', '#003300', '#FFFF00'],
          "defaultColors": ['#0093D0', '#800000', '#FF66CC', '#FF9900', '#003300', '#E6E600'],
          "isStacked": "true",
          "fill": 20,
          "displayExactValues": true,
          hAxis: {
            title: "Week"
          },
          vAxis: {
            title: "Qty OH",
            format: "decimal"
          },
          //curveType: "function"
        }
      };
      vm.chartObject.view = {
        columns: [0,1,2,3,4,5,6]
      };
    };
    vm.initStats = function() {
      for(item in vm.stats){
        vm.stats[item].min = Infinity;
        vm.stats[item].max = -Infinity;
        vm.stats[item].sum = 0;
        vm.stats[item].count = 0;
      };
    };
    vm.getItems();
    vm.getRouteParams();
    const btnChart = document.getElementById("btnChart");
    btnChart.addEventListener('click', function(e) {
      if(e.target && e.target.id=="btnChart"){
        $timeout(function(){
          vm.drawChart();
        },0);
      }
    });
  }
})();
