'use strict';

angular.module('roastTron.temppoint.services', ['ngResource'])

.factory('TempPointAPI',
  ['$resource', 'paths',
  function($resource, paths){

    var APIPaths = paths.getAPIPaths(paths.temppoint)

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

.factory('TempPoint', ['$rootScope', 'TempPointAPI',
  function($rootScope, TempPointAPI) {
    var service = {
      all: function(params) {
        return TempPointAPI.query(params);
      },
      get: function(id) {
        return TempPointAPI.get({id: id})
      },
      save: function(obj) {
        return TempPointAPI.save(obj)
      },
      update: function(obj) {
        return TempPointAPI.update(obj)
      },
      delete: function(obj) {
        return TempPointAPI.delete({id: obj.id})
      },
    }

    return service
  }]
)