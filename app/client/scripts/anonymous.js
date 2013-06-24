'use strict';


function findById(a, id) {
  for (var i = 0; i < a.length; i++) {
    if (a[i].id == id) return a[i];
  }
}

var app = angular.module('sample', ['ui.compat'])
  .config(
    [          '$stateProvider', '$routeProvider', '$urlRouterProvider',
      function ($stateProvider,   $routeProvider,   $urlRouterProvider) {
        $urlRouterProvider
          .otherwise('/');


      $stateProvider
          .state('root', {
              url: '/',
              templateUrl: 'views/main.html',
              controller: ['$scope', '$state',
                  function ($scope,   $state) {
                      $scope.username = "guest";
                  }]});


        $stateProvider
        .state('login', {
            url: '/login',
            templateProvider: [        '$timeout',
              function ($timeout) {
                return $timeout(function () {
                  return "login"
                }, 100);
              }]
        })
        .state('register', {
            url: '/register',
            templateProvider: [        '$timeout',
                function ($timeout) {
                    return $timeout(function () {
                        return "register"
                    }, 100);
                }]
        });
      }])
  .run(
    [          '$rootScope', '$state', '$stateParams',
      function ($rootScope,   $state,   $stateParams) {
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
      }]);

app.factory('PersonsService', function ($resource) {
  return $resource(
    '/api/persons/:id',
    {id: '@id'},
    {update: {method: 'PUT'}});
});

