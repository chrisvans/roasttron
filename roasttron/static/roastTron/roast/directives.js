'use strict';

angular.module('roastTron.roast.directives', [])

.directive('roastCreate', ['$rootScope', 'Roast',
  function($rootScope, Roast) {
    return {
      restrict: 'A',
      scope: {
        'form': '=',
        'obj': '=',
      },
      link: function(scope, element, attrs) {
        var formSave = function() {
          if (scope.form.$valid) {
            Roast.save(scope.obj).$promise.then(function(response) {
              $rootScope.$broadcast('roast.create.success')
              $rootScope.$broadcast('roast.list.add', response)
              $rootScope.$broadcast('roast.form.create.reset')
              scope.form.$setPristine();
              scope.form.$setUntouched();
            }, function(error) {
              $rootScope.$broadcast('roast.create.error', error)
            })
          }
        }
        element.bind('click', function(event) {
          formSave()
        })
        scope.$on('roast.create.form.submit', function() {
          formSave()
        })
      }
    }
  }
])

.directive('roastDelete', ['$rootScope', 'Roast',
  function($rootScope, Roast) {
    return {
      restrict: 'A',
      scope: {
        obj: '=',
        index: '=?',
      },
      link: function(scope, element, attrs) {
        element.bind('click', function() {
          Roast.delete(scope.obj).$promise.then(function(response) {
            if (typeof scope.index !== 'undefined') {
              $rootScope.$broadcast('roast.list.remove', scope.index);
            }
          }, function(error) {
            $rootScope.$broadcast('roast.delete.error', error);
          })
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
            element[0].blur();
            $rootScope.$broadcast('roast.create.form.submit')
          }
        })
      }
    }
  }
])