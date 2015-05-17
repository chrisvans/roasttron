'use strict';

angular.module('roastTron.roast.directives', ['ngRoute'])

.directive('roastCreate', ['$rootScope', 'Roast',
  function($rootScope, Roast) {
    return {
      restrict: 'A',
      scope: {
        'form': '=',
        'obj': '=',
      },
      link: function(scope, element, attrs) {
        var roastSave = function() {
          if (scope.form.$valid) {
            Roast.save(scope.obj).$promise.then(function(response) {
              $rootScope.$broadcast('roast.create.success')
              $rootScope.$broadcast('roast.list.add', response)
              $rootScope.$broadcast('roast.form.create.reset')
            }, function(error) {
              $rootScope.$broadcast('roast.create.error', error)
            })
          }
        }
        element.bind('click', function(event) {
          roastSave()
        })
        scope.$on('roast.create.form.submit', function() {
          roastSave()
        })
      }
    }
  }
])

.directive('roastFormNameInput', ['$rootScope',
  function($rootScope) {
    return {
      restrict: 'A',
      scope: {},
      link: function(scope, element, attrs) {
        scope.$on('roast.form.create.focus', function(event) {
          element[0].focus();
        })
        element.bind("keyup", function(event) {
          if (event.which === 13) {
            $rootScope.$broadcast('roast.create.form.submit')
          }
        })
      }
    }
  }
])