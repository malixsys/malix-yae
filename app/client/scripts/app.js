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
          .when('/c?id', '/animals/:id')
          .otherwise('/');

        $routeProvider
          .when('/user/:id', {
            redirectTo: '/animals/:id',
          })
          .when('/', {
            templateUrl: 'views/main.html',
            controller: [        '$scope', '$state',
                    function ($scope, $state) {
                        $scope.username = "guest";
                    }]
          });

        $stateProvider
          .state('animals', {
            url: '/animals',
            abstract: true,
            templateUrl: 'views/animals.html',
            controller: [        '$scope', '$state',
              function ($scope, $state) {
                $scope.animals = [
                  {
                    id: 1,
                    name: "Nellie",
                    items: [
                      {
                        id: 'a',
                        type: 'medal',
                        value: '55512341234',
                      },
                      {
                        id: 'b',
                        type: 'race',
                        value: 'poodle',
                      },
                      {
                        id: 'c',
                        type: 'species',
                        value: 'dog',
                      },

                    ],
                  },
                  {
                    id: 42,
                    name: "Rex",
                    items: [
                      {
                        id: 'a',
                        type: 'species',
                        value: 'cat',
                      },
                      {
                        id: 'b',
                        type: 'age',
                        value: '10',
                      }
                    ],
                  },
                  {
                    id: 123,
                    name: "Eve",
                    items: [
                      {
                        id: 'a',
                        type: 'species',
                        value: 'snake',
                      }
                    ],
                  }
                ];

                $scope.goToRandom = function () {
                  var animals = $scope.animals, id;
                  do {
                    id = animals[Math.floor(animals.length * Math.random())].id;
                  } while (id == $state.params.animalId);
                  $state.transitionTo('animals.detail', { animalId: id });
                };
              }],
          })
          .state('animals.list', {
            // parent: 'animals',
            url: '',
            templateUrl: 'views/animals.list.html',
          })
          .state('animals.detail', {
            // parent: 'animals',
            url: '/{animalId}',
            resolve: {
              something: [        '$timeout', '$stateParams',
                function ($timeout, $stateParams) {
                  return $timeout(function () {
                    return "Asynchronously resolved data (" + $stateParams.animalId + ")"
                  }, 10);
                }],
            },
            views: {
              '': {
                templateUrl: 'views/animals.detail.html',
                controller: [        '$scope', '$stateParams', 'something',
                  function ($scope, $stateParams, something) {
                    $scope.something = something;
                    $scope.animal = findById($scope.animals, $stateParams.animalId);
                  }],
              },
              'hint@': {
                template: 'This is animals.detail populating the view "hint@"',
              },
              'menu': {
                templateProvider: [ '$stateParams',
                  function ($stateParams) {
                    // This is just to demonstrate that $stateParams injection works for templateProvider
                    // $stateParams are the parameters for the new state we're transitioning to, even
                    // though the global '$stateParams' has not been updated yet.
                    return '<hr><small class="muted">animal ID: ' + $stateParams.animalId + '</small>';
                  }],
              },
            },
          })
          .state('animals.detail.item', {
            // parent: 'animals.detail',
            url: '/item/:itemId',
            views: {
              '': {
                templateUrl: 'views/animals.detail.item.html',
                controller: [        '$scope', '$stateParams', '$state',
                  function ($scope, $stateParams, $state) {
                    $scope.item = findById($scope.animal.items, $stateParams.itemId);
                    $scope.edit = function () {
                      $state.transitionTo('animals.detail.item.edit', $stateParams);
                    };
                  }],
              },
              'hint@': {
                template: 'Overriding the view "hint@"',
              },
            },
          })
          .state('animals.detail.item.edit', {
            views: {
              '@animals.detail': {
                templateUrl: 'views/animals.detail.item.edit.html',
                controller: [        '$scope', '$stateParams', '$state',
                  function ($scope, $stateParams, $state) {
                    $scope.item = findById($scope.animal.items, $stateParams.itemId);
                    $scope.done = function () {
                      $state.transitionTo('animals.detail.item', $stateParams);
                    };
                  }],
              },
            },
          })
          .state('about', {
            url: '/about',
            templateProvider: [        '$timeout',
              function ($timeout) {
                return $timeout(function () {
                  return "Hello world"
                }, 100);
              }],
          })
          .state('empty', {
            url: '/empty',
            templateUrl: 'views/empty.html',
            controller: [        '$scope', '$state',
              function ($scope, $state) {
                // Using an object to access it via ng-model from child scope
                $scope.data = {
                  initialViewTitle: "I am an initial view"
                }
                $scope.changeInitialViewTitle = function ($event) {
                  $state.transitionTo('empty.emptycontent');
                };
                $scope.showInitialView = function ($event) {
                  $state.transitionTo('empty');
                };
              }]
          })
          .state('empty.emptycontent', {
            url: '/content',
            views: {
              'emptycontent': {
                templateUrl: 'views/empty.content.html'
              }
            }
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

