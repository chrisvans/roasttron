'use strict';

angular.module('roastTron.roast.services', ['ngResource'])

.factory('RoastAPI',
  ['$resource', 'paths',
  function($resource, paths){

    var APIPaths = paths.getAPIPaths(paths.roast)

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

.factory('Roast', ['$rootScope', 'RoastAPI',
  function($rootScope, RoastAPI) {
    var service = {
      all: function(params) {
        return RoastAPI.query(params);
      },
      get: function(id) {
        return RoastAPI.get({id: id})
      },
      save: function(obj) {
        return RoastAPI.save(obj)
      },
      update: function(obj) {
        return RoastAPI.update(obj)
      },
      delete: function(obj) {
        return RoastAPI.delete({id: obj.id})
      },
    }
    return service
  }]
)