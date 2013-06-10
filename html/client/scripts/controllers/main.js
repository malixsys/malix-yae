'use strict';

angular.module('malixYaeApp')
  .controller('MainCtrl', function ($scope, $http, PersonsService) {
    $http.get('/api/persons/total').success(function(body) {
      $scope.total = body.total;
    });
    $scope.title = "malix-yae";
    $scope.username = "guest@example.com"
    $scope.persons = PersonsService.query();
  });
