'use strict';

angular.module('roastTron.roast.list', ['ngRoute'])

.config([
  '$routeProvider', 'staticPathProvider',
  function($routeProvider, staticPathProvider) {
    $routeProvider.when(
      '/roast',
      {
        controller: 'roastListCtrl',
        templateUrl: staticPathProvider.path('roastTron/roast/listView.html'),
      }
    ).when(
      '/roast/:id',
      {
        controller: 'roastListCtrl',
        templateUrl: staticPathProvider.path('roastTron/roast/listView.html'),
      }
    );
  }
])

.controller(
  'roastListCtrl',
  ['$scope', '$location', 'Roast',
  function($scope, $location, Roast) {

    // --> INIT
    // TODO: Restrict to roasts that the current User owns!
    Roast.all().$promise.then(function(response) {
      $scope.listData = response;
    });
    // <-- INIT

    // --> METHODS
    $scope.showDetail = function(object) {
      $scope.$broadcast('roast.list.select', object)
      $location.path('/roast/' + object.id, false)
    }
    // <-- METHODS

  }]
)