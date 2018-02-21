(function () {
  angular.module('casperApp').controller('navigationCtrl', navigationCtrl);
  navigationCtrl.$inject = ['$location'];
  function navigationCtrl($location) {
    let vm = this;
    vm.currentPath = $location.path();
  }  
})();
