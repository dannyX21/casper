(function () {
  angular.module('casperApp').controller('uploadCtrl', uploadCtrl);
  uploadCtrl.$inject = ['$location'];
  function uploadCtrl($location) {
    const vm = this;
    vm.pageHeader = {
      title: "Upload OPEN.SO File."
    };

    vm.onUploadSuccess = (response) => {
      let fileName = response.data.fileName;
      $location.path("/");
    };

    vm.onUploadError = (response) => {
      alert(JSON.stringify(response.data));
    };
  }
})();
