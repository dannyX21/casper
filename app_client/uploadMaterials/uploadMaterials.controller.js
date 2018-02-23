(function () {
  angular.module('casperApp').controller('uploadMaterialsCtrl', uploadMaterialsCtrl);
  uploadMaterialsCtrl.$inject = ['$location'];
  function uploadMaterialsCtrl($location) {
    const vm = this;
    vm.pageHeader = {
      title: "Upload Materials File."
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
