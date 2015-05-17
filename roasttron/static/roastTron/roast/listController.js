'use strict';

angular.module('roastTron.roast.list', ['ngRoute'])

.controller(
  'roastListCtrl',
  ['$rootScope', '$scope', '$location', '$timeout', 'Roast',
  function($rootScope, $scope, $location, $timeout, Roast) {


    // --> METHODS
    $scope.showDetail = function(object) {
      $location.path('/roast/' + object.id)
    }

    $scope.initCreateForm = function() {
      $scope.newRoast = {
        coffee: $scope.coffee
      }
    }

    $scope.showCreateForm = function() {
      $scope.createFormVisible = true;
      $timeout(function() {
        $scope.$broadcast('roast.form.create.focus')
      })      
    }

    $scope.hideCreateForm = function() {
      $scope.createFormVisible = false;
    }
    // <-- METHODS

    // --> INIT
    // TODO: Restrict to roasts that the current User owns!
    Roast.all().$promise.then(function(response) {
      $scope.listData = response;
    });

    // TODO: Replace this with real data
    $scope.coffee = 3;

    $scope.initCreateForm();
    // <-- INIT


    // --> LISTENERS
    $scope.$on('roast.list.add', function(event, data) {
      $scope.listData.results.push(data);
      $location.path('/roast/' + data.id)
      $timeout(function() {
        $rootScope.$broadcast('roast.detail.recording')
      })
    })

    $scope.$on('roast.form.create.reset', function(event) {
      $scope.initCreateForm();
      $scope.createFormVisible = false;
    })
    // <-- LISTENERS

  }]
)