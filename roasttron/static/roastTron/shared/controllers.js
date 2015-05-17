'use strict';

angular.module('roastTron.shared.controllers', [])

.controller(
  'main',
  ['$scope', 'staticPath',
  function($scope, staticPath) {

    $scope.staticPath = staticPath;

  }]
)