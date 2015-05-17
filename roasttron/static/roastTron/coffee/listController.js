'use strict';

angular.module('roastTron.coffee.list', [])

.controller(
  'coffeeListCtrl',
  ['$scope', '$location', '$timeout', 'Coffee',
  function($scope, $location, $timeout, Coffee) {

    // METHODS -->
    $scope.initCreateForm = function() {
      $scope.newCoffee = {
      }
    }

    $scope.showCreateForm = function() {
      $scope.createFormVisible = true;
      $timeout(function() {
        $scope.$broadcast('coffee.form.create.focus')
      })      
    }

    $scope.hideCreateForm = function() {
      $scope.createFormVisible = false;
    }
    // <-- METHODS

    // INIT -->
    Coffee.all().$promise.then(
      function(response) {
        $scope.listData = response;
      }
    )
    $scope.initCreateForm();
    // <-- INIT

    // LISTENERS -->
    $scope.$on('coffee.list.add', function(event, data) {
      $scope.listData.results.push(data);
    })

    $scope.$on('coffee.list.remove', function(event, index) {
      // Ensure current detail view is not being removed
      $scope.listData.results.splice(index, 1);
      // Reload list if too small, or on some condition that makes sense
    })

    $scope.$on('coffee.form.create.reset', function(event) {
      $scope.initCreateForm();
      $scope.createFormVisible = false;
    })
    // <-- LISTENERS

  }]
)