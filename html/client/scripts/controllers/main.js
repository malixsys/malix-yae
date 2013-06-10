'use strict';

angular.module('malixYaeApp')
  .controller('MainCtrl', function ($scope, $http, PersonsService) {
    $scope.title = "malix-yae";
    $scope.username = "guest@example.com"
    $scope.persons = PersonsService.query();
  });
