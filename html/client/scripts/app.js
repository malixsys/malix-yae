'use strict';

var app = angular.module('malixYaeApp', ['ngResource']);

app.config(function ($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
      $locationProvider.html5Mode(true);
  });

app.factory('PersonsService', function($resource){
  return $resource(
    '/api/persons/:id',
    {id: '@id'},
    {update: {method: 'PUT'}});
});

app.run(function($rootScope){
    $rootScope.$apply($(document).foundation());
  });
