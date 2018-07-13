(function() {
  angular.module('casperApp').controller('sqsCtrl', sqsCtrl);
  sqsCtrl.$inject = ['sqsData'];
  function sqsCtrl(sqsData) {
    const vm = this;

    vm.getPendingSQs = function() {
      sqsData.getPendingSQs().then(function(data) {
        vm.sqs = data.data;
      }, function(err) {
        console.log(err);
      });
    };
    vm.getPendingSQs();
  }  
})();
