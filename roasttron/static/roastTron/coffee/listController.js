'use strict';

angular.module('roastTron.coffee.list', ['ngRoute'])

.controller(
  'coffeeListCtrl',
  ['$scope', '$location', '$timeout', 'Coffee',
  function($scope, $location, $timeout, Coffee) {

    // METHODS -->
    $scope.showDetail = function(object) {
      $location.path('/coffee/' + object.id)
    }

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

    $scope.$on('coffee.form.create.reset', function(event) {
      $scope.initCreateForm();
      $scope.createFormVisible = false;
    })
    // <-- LISTENERS

  }]
)