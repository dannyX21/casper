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
    .when('/summary', {
      templateUrl: '/summary/summary.view.html',
      controller: 'summaryCtrl',
      controllerAs: 'vm'
    })
    .otherwise({
      redirectTo: "/"
    });
  }
  angular.module('casperApp').config(['$routeProvider', '$locationProvider', config]);
})();
