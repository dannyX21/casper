(function () {
  angular.module('casperApp').controller('uploadSQsCtrl', uploadSQsCtrl);
  uploadSQsCtrl.$inject = ['$location'];
  function uploadSQsCtrl($location) {
    const vm = this;
    vm.pageHeader = {
      title: "Upload SQ's File."
    };

    vm.onUploadSuccess = function(response) {
      let fileName = response.data.fileName;
      $location.path("/");
    };

    vm.onUploadError = function(response) {
      alert(JSON.stringify(response.data));
    };
  }
})();
