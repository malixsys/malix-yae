'use strict';


function findById(a, id) {
  for (var i = 0; i < a.length; i++) {
    if (a[i].id == id) return a[i];
  }
}

var app = angular.module('sample', ['ui.compat'])
  .config(
    [        '$stateProvider', '$routeProvider', '$urlRouterProvider',
      function ($stateProvider, $routeProvider, $urlRouterProvider) {
        $urlRouterProvider
          .when('/c?id', '/contacts/:id')
          .otherwise('/');

        $routeProvider
          .when('/user/:id', {
            redirectTo: '/contacts/:id',
          })
          .when('/', {
            templateUrl: 'views/main.html',
          });

        $stateProvider
          .state('contacts', {
            url: '/contacts',
            abstract: true,
            templateUrl: 'views/contacts.html',
            controller: [        '$scope', '$state',
              function ($scope, $state) {
                $scope.contacts = [
                  {
                    id: 1,
                    name: "Alice",
                    items: [
                      {
                        id: 'a',
                        type: 'phone number',
                        value: '555-1234-1234',
                      },
                      {
                        id: 'b',
                        type: 'email',
                        value: 'alice@mailinator.com',
                      }
                    ],
                  },
                  {
                    id: 42,
                    name: "Bob",
                    items: [
                      {
                        id: 'a',
                        type: 'blog',
                        value: 'http://bob.blogger.com',
                      },
                      {
                        id: 'b',
                        type: 'fax',
                        value: '555-999-9999',
                      }
                    ],
                  },
                  {
                    id: 123,
                    name: "Eve",
                    items: [
                      {
                        id: 'a',
                        type: 'full name',
                        value: 'Eve Adamsdottir',
                      }
                    ],
                  }
                ];

                $scope.goToRandom = function () {
                  var contacts = $scope.contacts, id;
                  do {
                    id = contacts[Math.floor(contacts.length * Math.random())].id;
                  } while (id == $state.params.contactId);
                  $state.transitionTo('contacts.detail', { contactId: id });
                };
              }],
          })
          .state('contacts.list', {
            // parent: 'contacts',
            url: '',
            templateUrl: 'views/contacts.list.html',
          })
          .state('contacts.detail', {
            // parent: 'contacts',
            url: '/{contactId}',
            resolve: {
              something: [        '$timeout', '$stateParams',
                function ($timeout, $stateParams) {
                  return $timeout(function () {
                    return "Asynchronously resolved data (" + $stateParams.contactId + ")"
                  }, 10);
                }],
            },
            views: {
              '': {
                templateUrl: 'views/contacts.detail.html',
                controller: [        '$scope', '$stateParams', 'something',
                  function ($scope, $stateParams, something) {
                    $scope.something = something;
                    $scope.contact = findById($scope.contacts, $stateParams.contactId);
                  }],
              },
              'hint@': {
                template: 'This is contacts.detail populating the view "hint@"',
              },
              'menu': {
                templateProvider: [ '$stateParams',
                  function ($stateParams) {
                    // This is just to demonstrate that $stateParams injection works for templateProvider
                    // $stateParams are the parameters for the new state we're transitioning to, even
                    // though the global '$stateParams' has not been updated yet.
                    return '<hr><small class="muted">Contact ID: ' + $stateParams.contactId + '</small>';
                  }],
              },
            },
          })
          .state('contacts.detail.item', {
            // parent: 'contacts.detail',
            url: '/item/:itemId',
            views: {
              '': {
                templateUrl: 'views/contacts.detail.item.html',
                controller: [        '$scope', '$stateParams', '$state',
                  function ($scope, $stateParams, $state) {
                    $scope.item = findById($scope.contact.items, $stateParams.itemId);
                    $scope.edit = function () {
                      $state.transitionTo('contacts.detail.item.edit', $stateParams);
                    };
                  }],
              },
              'hint@': {
                template: 'Overriding the view "hint@"',
              },
            },
          })
          .state('contacts.detail.item.edit', {
            views: {
              '@contacts.detail': {
                templateUrl: 'views/contacts.detail.item.edit.html',
                controller: [        '$scope', '$stateParams', '$state',
                  function ($scope, $stateParams, $state) {
                    $scope.item = findById($scope.contact.items, $stateParams.itemId);
                    $scope.done = function () {
                      $state.transitionTo('contacts.detail.item', $stateParams);
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

