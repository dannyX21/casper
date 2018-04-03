(function() {
  angular.module('casperApp').controller('evaluationCtrl', evaluationCtrl);
  evaluationCtrl.$inject = ['evaluationData'];
  function evaluationCtrl(evaluationData) {
    const vm = this;
    vm.pageHeader = {
      title: "Stewart Connector Systems"
    };

    vm.rating = {
      q1: {
        text:"Incomming and Line Quality Rejections (SDRs) issued.",
        weight: 4
      },
      q2: {
        text:"Corrective Action Reports (CARs) issued.",
        weight: 5
      },
      q3: {
        text:"Service.",
        weight: 1
      },
      d1: {
        text:"On-time.",
        weight: 5
      },
      d2: {
        text:"Lead Times - Against our expectations.",
        weight: 3
      },
      d3: {
        text:"Paperwork - packing slips, advance shipping paperwork, product labels.",
        weight: 2
      }
    };

    vm.getPeriods = function() {
      evaluationData.getPeriods().then(function(data) {
        vm.periods = data.data;
        if(vm.periods.length>0) {
          vm.period = vm.periods[0];
          vm.getEvaluation(vm.period.period);
        }
      }, function(err) {
        console.log(err);
      });
    };

    vm.getEvaluation = function(period) {
      evaluationData.getEvaluation(period).then(function(data) {
        vm.vendors = data.data.vendors;
        vm.vendors.forEach(function(ven) {
          ven.s1 = ven.q1 * vm.rating.q1.weight;
          ven.s2 = ven.q2 * vm.rating.q2.weight;
          ven.s3 = ven.q3 * vm.rating.q3.weight;
          ven.s4 = ven.d1 * vm.rating.d1.weight;
          ven.s5 = ven.d2 * vm.rating.d2.weight;
          ven.s6 = ven.d3 * vm.rating.d3.weight;
          ven.quality = ven.s1 + ven.s2 + ven.s3;
          ven.delivery = ven.s4 + ven.s5 + ven.s6;
        });
        vm.getChart();
      },function(err) {
        console.log(err);
      });
    };

    vm.onPeriodChange = function(){
      console.log(vm.period);
      vm.getEvaluation(vm.period.period);
    };

    vm.getChart = function() {
      vm.chartObject = {
        type: "ColumnChart",
        displayed: false,
        data: {
          cols: [
            {
              id: "vendor",
              label: "Vendor",
              type: "string",
              p: {}
            },
            {
              id: "quality",
              label: "Quality",
              type: "number",
              p: {}
            },
            {
              id: "delivery",
              label: "Delivery",
              type: "number",
              p: {}
            }
          ],
          rows: []
        },
        options: {
          "title": "Vendor Evaluation " + vm.period.period ,
          isStacked: true,
          fill: 20,
          displayExactValues: true,
          colors: ['#0093D0', "#929296"],
          animation: {
            duration: 1000,
            easing: 'out',
            startup: true
          },
          series: {
            2: {
              annotations: {
                stem: {
                  color: "transparent",
                  length: 10
                }
              },
              enableInteractivity: false,
              tooltip: "none",
              visibleInLegend: false
            }
          },
          "vAxis": {
            title: "Score",
            viewWindow: {
              min: 0,
              max: 120
            },
            gridlines: {
              count: -1,
            }
          },
          "hAxis": {
            title: "Vendor"
          }
        },
        "view": {
          columns: [0, 1,
            {
              calc: 'stringify',
              sourceColumn: 1,
              type: 'string',
              role: 'annotation'
            },
            2,
            {
              calc: 'stringify',
              sourceColumn: 2,
              type: 'string',
              role: 'annotation'
            },
            {
              calc: function (dt, row) {
                return 0;
              },
              label: "Total",
              type: "number",
            },
            {
              calc: function(dt, row) {
                return dt.getValue(row, 1) + dt.getValue(row, 2);
              },
              type: "number",
              role: "annotation"
            }
          ]
        },
        formatters: {}
      };
      console.log(vm.vendors.length);
      vm.vendors.forEach(function(ven) {
        vm.chartObject.data.rows.push({
          c: [
            {
              v: ven.name
            },
            {
              v: ven.quality
            },
            {
              v: ven.delivery
            }
          ]
        });
      });
      console.log(vm.chartObject);
    };

    vm.getPeriods();
  }

})();
