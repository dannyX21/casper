(function() {
  angular.module('casperApp').controller('incomingCtrl', incomingCtrl);

  function incomingCtrl() {
    const vm = this;
    vm.pageHeader = {
      title: "Stewart Connector Systems"
    };

    vm.updateLetterCode = function() {
      let index = 0;
      while(vm.insLevel.table[index].lot < vm.lotQty) {
        index ++;
      }
      console.log("Sample size code letter: " + vm.insLevel.table[index].letter);
      console.log("Sample table: " + vm.sampleTable[vm.insLevel.table[index].letter])
      console.log("vm.aqlValue: " + vm.aqlValue);
      console.log("aqlValues.index: " + vm.aqlValues.indexOf(vm.aqlValue));
      vm.letterCode = vm.sampleTable[vm.insLevel.table[index].letter][vm.aqlValues.indexOf(vm.aqlValue)];
      console.log("letterCode: " + vm.letterCode);
      vm.updateData();
    };
    vm.updateData = function() {
      console.log("AQL Value: " + vm.aqlValue);
      vm.sample = vm.masterTable[vm.letterCode].sampleSize;
      vm.qtyAccept = vm.masterTable[vm.letterCode].values[vm.aqlValues.indexOf(vm.aqlValue)];
      vm.qtyReject = vm.qtyAccept + 1;
    }

    vm.sampleSize = {
      s1: {
        label: "S-1",
        table: [
          { lot: 8, letter: 'A'},
          { lot: 15, letter: 'A'},
          { lot: 25, letter: 'A'},
          { lot: 50, letter: 'A'},
          { lot: 90, letter: 'B'},
          { lot: 150, letter: 'B'},
          { lot: 280, letter: 'B'},
          { lot: 500, letter: 'B'},
          { lot: 1200, letter: 'C'},
          { lot: 3200, letter: 'C'},
          { lot: 10000, letter: 'C'},
          { lot: 35000, letter: 'C'},
          { lot: 50000, letter: 'D'},
          { lot: 500000, letter: 'D'},
          { lot: 999999999, letter: 'D'}
        ]},
      s2: {
        label: "S-2",
        table: [
          { lot: 8, letter: 'A'},
          { lot: 15, letter: 'A'},
          { lot: 25, letter: 'A'},
          { lot: 50, letter: 'B'},
          { lot: 90, letter: 'B'},
          { lot: 150, letter: 'B'},
          { lot: 280, letter: 'C'},
          { lot: 500, letter: 'C'},
          { lot: 1200, letter: 'C'},
          { lot: 3200, letter: 'D'},
          { lot: 10000, letter: 'D'},
          { lot: 35000, letter: 'D'},
          { lot: 50000, letter: 'E'},
          { lot: 500000, letter: 'E'},
          { lot: 999999999, letter: 'E'}
        ]},
      s3: {
        label: "S-3",
        table: [
          { lot: 8, letter: 'A'},
        { lot: 15, letter: 'A'},
        { lot: 25, letter: 'B'},
        { lot: 50, letter: 'B'},
        { lot: 90, letter: 'C'},
        { lot: 150, letter: 'C'},
        { lot: 280, letter: 'D'},
        { lot: 500, letter: 'D'},
        { lot: 1200, letter: 'E'},
        { lot: 3200, letter: 'E'},
        { lot: 10000, letter: 'F'},
        { lot: 35000, letter: 'F'},
        { lot: 50000, letter: 'G'},
        { lot: 500000, letter: 'G'},
        { lot: 999999999, letter: 'H'}
      ]},
    s4: {
      label: "S-4",
      table: [
        { lot: 8, letter: 'A'},
        { lot: 15, letter: 'A'},
        { lot: 25, letter: 'B'},
        { lot: 50, letter: 'C'},
        { lot: 90, letter: 'C'},
        { lot: 150, letter: 'D'},
        { lot: 280, letter: 'E'},
        { lot: 500, letter: 'E'},
        { lot: 1200, letter: 'F'},
        { lot: 3200, letter: 'G'},
        { lot: 10000, letter: 'G'},
        { lot: 35000, letter: 'H'},
        { lot: 50000, letter: 'J'},
        { lot: 500000, letter: 'J'},
        { lot: 999999999, letter: 'K'}
      ]},
    I: {
      label: "I",
      table: [
        { lot: 8, letter: 'A'},
        { lot: 15, letter: 'A'},
        { lot: 25, letter: 'B'},
        { lot: 50, letter: 'C'},
        { lot: 90, letter: 'C'},
        { lot: 150, letter: 'D'},
        { lot: 280, letter: 'E'},
        { lot: 500, letter: 'F'},
        { lot: 1200, letter: 'G'},
        { lot: 3200, letter: 'H'},
        { lot: 10000, letter: 'J'},
        { lot: 35000, letter: 'K'},
        { lot: 50000, letter: 'L'},
        { lot: 500000, letter: 'M'},
        { lot: 999999999, letter: 'N'}
      ]},
    II: {
      label: "II",
      table: [
        { lot: 8, letter: 'A'},
        { lot: 15, letter: 'B'},
        { lot: 25, letter: 'C'},
        { lot: 50, letter: 'D'},
        { lot: 90, letter: 'E'},
        { lot: 150, letter: 'F'},
        { lot: 280, letter: 'G'},
        { lot: 500, letter: 'H'},
        { lot: 1200, letter: 'J'},
        { lot: 3200, letter: 'K'},
        { lot: 10000, letter: 'L'},
        { lot: 35000, letter: 'M'},
        { lot: 50000, letter: 'N'},
        { lot: 500000, letter: 'P'},
        { lot: 999999999, letter: 'Q'}
      ]},
    III: {
      label: "III",
      table: [
        { lot: 8, letter: 'B'},
        { lot: 15, letter: 'C'},
        { lot: 25, letter: 'D'},
        { lot: 50, letter: 'E'},
        { lot: 90, letter: 'F'},
        { lot: 150, letter: 'G'},
        { lot: 280, letter: 'H'},
        { lot: 500, letter: 'J'},
        { lot: 1200, letter: 'K'},
        { lot: 3200, letter: 'L'},
        { lot: 10000, letter: 'M'},
        { lot: 35000, letter: 'N'},
        { lot: 50000, letter: 'P'},
        { lot: 500000, letter: 'Q'},
        { lot: 999999999, letter: 'R'}
      ]}
    };
    vm.aqlValues = [0.01,	0.015, 0.025,	0.04,	0.065,	0.1,	0.15,	0.25,	0.4,	0.65,	1,	1.5,	2.5,	4,	6.5,	10,	15,	25,	40,	65,	100,	150,	250,	400,	650,	1000];
    vm.masterTable = {
      A: { sampleSize: 2, values: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,2,3,5,7,10,14,21,30]},
      B: { sampleSize: 3, values: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,2,3,5,7,10,14,21,30,44]},
      C: { sampleSize: 5, values: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,2,3,5,7,10,14,21,30,44,44]},
      D: { sampleSize: 8, values: [0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,2,3,5,7,10,14,21,30,44,44,44]},
      E: { sampleSize: 13, values: [0,0,0,0,0,0,0,0,0,0,0,0,1,1,2,3,5,7,10,14,21,30,44,44,44,44]},
      F: { sampleSize: 20, values: [0,0,0,0,0,0,0,0,0,0,0,1,1,2,3,5,7,10,14,21,21,30,44,44,44,44]},
      G: { sampleSize: 32, values: [0,0,0,0,0,0,0,0,0,0,1,1,2,3,5,7,10,14,21,21,21,30,44,44,44,44]},
      H: { sampleSize: 50, values: [0,0,0,0,0,0,0,0,0,1,1,2,3,5,7,10,14,21,21,21,21,30,44,44,44,44]},
      J: { sampleSize: 80, values: [0,0,0,0,0,0,0,0,1,1,2,3,5,7,10,14,21,21,21,21,21,30,44,44,44,44]},
      K: { sampleSize: 125, values: [0,0,0,0,0,0,0,1,1,2,3,5,7,10,14,21,21,21,21,21,21,30,44,44,44,44]},
      L: { sampleSize: 200, values: [0,0,0,0,0,0,1,1,2,3,5,7,10,14,21,21,21,21,21,21,21,30,44,44,44,44]},
      M: { sampleSize: 315, values: [0,0,0,0,0,1,1,2,3,5,7,10,14,21,21,21,21,21,21,21,21,30,44,44,44,44]},
      N: { sampleSize: 500, values: [0,0,0,0,1,1,2,3,5,7,10,14,21,21,21,21,21,21,21,21,21,30,44,44,44,44]},
      P: { sampleSize: 800, values: [0,0,0,1,1,2,3,5,7,10,14,21,21,21,21,21,21,21,21,21,21,30,44,44,44,44]},
      Q: { sampleSize: 1250, values: [0,0,1,1,2,3,5,7,10,14,21,21,21,21,21,21,21,21,21,21,21,30,44,44,44,44]},
      R: { sampleSize: 2000, values: [0,0,1,2,3,5,7,10,14,21,21,21,21,21,21,21,21,21,21,21,21,30,44,44,44,44]}
    };
    vm.sampleTable = {
      A: ['Q', 'P', 'N', 'M', 'L', 'K', 'J', 'H', 'G', 'F', 'E', 'D', 'C', 'B', 'A', 'C', 'B', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A'],
      B: ['Q', 'P', 'N', 'M', 'L', 'K', 'J', 'H', 'G', 'F', 'E', 'D', 'C', 'B', 'A', 'C', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B'],
      C: ['Q', 'P', 'N', 'M', 'L', 'K', 'J', 'H', 'G', 'F', 'E', 'D', 'C', 'B', 'D', 'C', 'C', 'C', 'C', 'C', 'C', 'C', 'C', 'C', 'C', 'B'],
      D: ['Q', 'P', 'N', 'M', 'L', 'K', 'J', 'H', 'G', 'F', 'E', 'D', 'C', 'E', 'D', 'D', 'D', 'D', 'D', 'D', 'D', 'D', 'D', 'D', 'C', 'B'],
      E: ['Q', 'P', 'N', 'M', 'L', 'K', 'J', 'H', 'G', 'F', 'E', 'D', 'F', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'D', 'C', 'B'],
      F: ['Q', 'P', 'N', 'M', 'L', 'K', 'J', 'H', 'G', 'F', 'E', 'G', 'F', 'F', 'F', 'F', 'F', 'F', 'F', 'F', 'E', 'E', 'E', 'D', 'C', 'B'],
      G: ['Q', 'P', 'N', 'M', 'L', 'K', 'J', 'H', 'G', 'F', 'H', 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'F', 'E', 'E', 'E', 'D', 'C', 'B'],
      H: ['Q', 'P', 'N', 'M', 'L', 'K', 'J', 'H', 'G', 'J', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'G', 'F', 'E', 'E', 'E', 'D', 'C', 'B'],
      J: ['Q', 'P', 'N', 'M', 'L', 'K', 'J', 'H', 'K', 'J', 'J', 'J', 'J', 'J', 'J', 'J', 'J', 'H', 'G', 'F', 'E', 'E', 'E', 'D', 'C', 'B'],
      K: ['Q', 'P', 'N', 'M', 'L', 'K', 'J', 'L', 'K', 'K', 'K', 'K', 'K', 'K', 'K', 'K', 'J', 'H', 'G', 'F', 'E', 'E', 'E', 'D', 'C', 'B'],
      L: ['Q', 'P', 'N', 'M', 'L', 'K', 'M', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'K', 'J', 'H', 'G', 'F', 'E', 'E', 'E', 'D', 'C', 'B'],
      M: ['Q', 'P', 'N', 'M', 'L', 'N', 'M', 'M', 'M', 'M', 'M', 'M', 'M', 'M', 'L', 'K', 'J', 'H', 'G', 'F', 'E', 'E', 'E', 'D', 'C', 'B'],
      N: ['Q', 'P', 'N', 'M', 'P', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'M', 'L', 'K', 'J', 'H', 'G', 'F', 'E', 'E', 'E', 'D', 'C', 'B'],
      P: ['Q', 'P', 'N', 'Q', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'N', 'M', 'L', 'K', 'J', 'H', 'G', 'F', 'E', 'E', 'E', 'D', 'C', 'B'],
      Q: ['Q', 'P', 'R', 'Q', 'Q', 'Q', 'Q', 'Q', 'Q', 'Q', 'Q', 'P', 'N', 'M', 'L', 'K', 'J', 'H', 'G', 'F', 'E', 'E', 'E', 'D', 'C', 'B'],
      R: ['Q', 'P', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'Q', 'P', 'N', 'M', 'L', 'K', 'J', 'H', 'G', 'F', 'E', 'E', 'E', 'D', 'C', 'B'],
    };
    vm.insLevel = vm.sampleSize.I;
    vm.lotQty = 0;
    vm.aqlValue = 1;
    vm.updateLetterCode();
  }
})();
