(function() {
  angular.module('casperApp', ['ngRoute', 'ngSanitize', 'ngMaterial', 'ngMessages', 'lr.upload', 'googlechart']);
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
    .when('/uploadSQs', {
      templateUrl: "/uploadSQs/uploadSQs.view.html",
      controller: "uploadSQsCtrl",
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
    .when('/evaluation', {
      templateUrl: '/evaluation/evaluation.view.html',
      controller: 'evaluationCtrl',
      controllerAs: 'vm'
    })
    .when('/aql', {
      templateUrl: '/incoming/incoming.view.html',
      controller: 'incomingCtrl',
      controllerAs: 'vm'
    })
    .when('/simulation', {
      templateUrl: '/simulation/simulation.view.html',
      controller: 'simulationCtrl',
      controllerAs: 'vm'
    })
    .when('/sqs', {
      templateUrl: '/sqs/sqs.view.html',
      controller: 'sqsCtrl',
      controllerAs: 'vm'
    })
    .otherwise({
      redirectTo: "/"
    });
  }
  angular.module('casperApp').config(['$routeProvider', '$locationProvider', config]);
  angular.module('casperApp').value('googleChartApiConfig', {
    version: '1',
    optionalSettings: {
      packages: ['corechart'],
      language: "en"
    }
  });
})();
