'use strict';

angular.module('roastTron.coffee.directives', [])

.directive('coffeeCreate', ['$rootScope', 'Coffee',
  function($rootScope, Coffee) {
    return {
      restrict: 'A',
      scope: {
        'form': '=',
        'obj': '=',
      },
      link: function(scope, element, attrs) {
        var formSave = function() {
          if (scope.form.$valid) {
            Coffee.save(scope.obj).$promise.then(function(response) {
              $rootScope.$broadcast('coffee.create.success')
              $rootScope.$broadcast('coffee.list.add', response)
              $rootScope.$broadcast('coffee.form.create.reset')
              scope.form.$setPristine();
              scope.form.$setUntouched();
            }, function(error) {
              $rootScope.$broadcast('coffee.create.error', error)
            })
          }
        }
        element.bind('click', function(event) {
          formSave()
        })
        scope.$on('coffee.create.form.submit', function() {
          formSave()
        })
      }
    }
  }
])

.directive('coffeeDelete', ['$rootScope', 'Coffee',
  function($rootScope, Coffee) {
    return {
      restrict: 'A',
      scope: {
        obj: '=',
        index: '=?',
      },
      link: function(scope, element, attrs) {
        element.bind('click', function() {
          Coffee.delete(scope.obj).$promise.then(function(response) {
            if (typeof scope.index !== 'undefined') {
              $rootScope.$broadcast('coffee.list.remove', scope.index);
            }
          }, function(error) {
            $rootScope.$broadcast('coffee.delete.error', error);
          })
        })
      }
    }  
  }
])

.directive('coffeeFormNameInput', ['$rootScope',
  function($rootScope) {
    return {
      restrict: 'A',
      scope: {},
      link: function(scope, element, attrs) {
        scope.$on('coffee.form.create.focus', function(event) {
          element[0].focus();
        })
        element.bind("keyup", function(event) {
          if (event.which === 13) {
            element[0].blur();
            $rootScope.$broadcast('coffee.create.form.submit')
          }
        })
      }
    }
  }
])