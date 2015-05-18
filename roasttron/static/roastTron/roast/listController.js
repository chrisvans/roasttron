'use strict';

angular.module('roastTron.roast.list', [])

.controller(
  'roastListCtrl',
  ['$rootScope', '$scope', '$timeout', '$state', '$stateParams', 'Roast',
  function($rootScope, $scope, $timeout, $state, $stateParams, Roast) {

    // --> METHODS

    $scope.initCreateForm = function() {
      $scope.newRoast = {
        coffee: $stateParams.coffeeid
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
    Roast.all({coffee:$stateParams.coffeeid}).$promise.then(function(response) {
      $scope.listData = response;
    });

    $scope.initCreateForm();
    // <-- INIT


    // --> LISTENERS
    $scope.$on('roast.list.add', function(event, data) {
      $scope.listData.results.push(data);
      $state.go('roast.detail', {coffeeid: data.coffee, id: data.id})
      $timeout(function() {
        $rootScope.$broadcast('roast.detail.recording')
      })
    })

    $scope.$on('roast.list.remove', function(event, index) {
      // Ensure current detail view is not being removed.
      $scope.listData.results.splice(index, 1);
      // Reload list on some condition
    })

    $scope.$on('roast.form.create.reset', function(event) {
      $scope.initCreateForm();
      $scope.createFormVisible = false;
    })
    // <-- LISTENERS

  }]
)