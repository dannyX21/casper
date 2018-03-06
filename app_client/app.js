(function() {
  angular.module('casperApp', ['ngRoute', 'ngSanitize', 'ngMaterial', 'ngMessages', 'lr.upload']);
  function config($routeProvider, $locationProvider) {
    $locationProvider.hashPrefix('');
    $routeProvider
    .when('/', {
      templateUrl: "/home/home.view.html",
      controller: "homeCtrl",
      controllerAs: "vm"
    })
    .when('/upload', {
      templateUrl: "/upload/upload.view.html",
      controller: "uploadCtrl",
      controllerAs: "vm"
    })
    .when('/uploadMaterials', {
      templateUrl: "/uploadMaterials/uploadMaterials.view.html",
      controller: "uploadMaterialsCtrl",
      controllerAs: "vm"
    })
    .when('/summary', {
      templateUrl: '/summary/summary.view.html',
      controller: 'summaryCtrl',
      controllerAs: 'vm'
    })
    .when('/mrp', {
      templateUrl: '/mrp/mrp.view.html',
      controller: 'mrpCtrl',
      controllerAs: 'vm'
    })
    .when('/materials', {
      templateUrl: '/materials/materials.view.html',
      controller: 'materialsCtrl',
      controllerAs: 'vm'
    })
    .otherwise({
      redirectTo: "/"
    });
  }
  angular.module('casperApp').config(['$routeProvider', '$locationProvider', config]);
})();
