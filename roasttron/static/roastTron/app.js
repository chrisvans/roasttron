'use strict';

// Declare app level module which depends on views, and components
angular.module('roastTron', [

  'ngRoute',
  'ngCookies',
  'nvd3',

  'someController',

])

.config(['$interpolateProvider', function($interpolateProvider) {
  // Change the default template variable from {{ variable }} to [[ variable ]] to play nice with Django.
  $interpolateProvider.startSymbol('[[').endSymbol(']]');
}])

.config(['$resourceProvider', function($resourceProvider) {
  // Don't strip trailing slashes from calculated URLs
  $resourceProvider.defaults.stripTrailingSlashes = false;
}])

.config(['$sceDelegateProvider', function($sceDelegateProvider) {
  // Trust resources from ourself, and....
  $sceDelegateProvider.resourceUrlWhitelist([
    'self',
    //'https://amazon-bucket-url/**',
  ]);
}])

.run(['$http', '$cookies', function($http, $cookies) {
    // Add a X-CSRF token to our headers.
    $http.defaults.headers.common['X-CSRFToken'] = $cookies.csrftoken;
  }
])

// TODO: Create a shared.filters module.
.filter('trusthtml', ['$sce', function($sce) {
  // Custom filter to trust raw html from a variable.
  return function(val) {
      return $sce.trustAsHtml(val);
  };
}]) 
