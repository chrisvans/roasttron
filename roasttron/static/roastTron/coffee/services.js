'use strict';

angular.module('roastTron.coffee.services', ['ngResource'])

.factory('CoffeeAPI',
  ['$resource', 'paths',
  function($resource, paths){

    var APIPaths = paths.getAPIPaths(paths.coffee)

    var resource = $resource(
      APIPaths.base,
      {},
      {
        query: {
          method: 'GET',
          isArray: false,
          url: APIPaths.list
        },
        get: {
          method: 'GET',
          url: APIPaths.detail,
          params: { id:'@id' }
        },
        update: {
          method: 'PATCH',
          url: APIPaths.update,
          params: { id:'@id' }
        },
        save: {
          method: 'POST',
          url: APIPaths.save
        },
        delete: {
          method: 'DELETE',
          url: APIPaths.detail,
          params: { id:'@id' }
        }
      }
    )
    return resource;
  }]
)

.factory('Coffee', ['$rootScope', 'CoffeeAPI',
  function($rootScope, CoffeeAPI) {
    var service = {
      all: function(params) {
        return CoffeeAPI.query(params);
      },
      get: function(id) {
        return CoffeeAPI.get({id: id})
      },
      save: function(obj) {
        return CoffeeAPI.save(obj)
      },
      update: function(obj) {
        return CoffeeAPI.update(obj)
      },
      delete: function(obj) {
        return CoffeeAPI.delete({id: obj.id})
      },
    }

    return service
  }]
)