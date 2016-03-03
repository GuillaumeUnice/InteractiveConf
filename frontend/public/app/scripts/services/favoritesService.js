'use strict';

/**
 * @ngdoc service
 * @name yeomanTodoAppDemoApp.FavoritesService
 * @description
 * # FavoritesService
 * Service in the yeomanTodoAppDemoApp.
 */

angular.module('Public')
	.factory('FavoritesService', function ($q , $http, CONFIG) {
	// AngularJS will instantiate a singleton by calling "new" on this
   return {
      addToFavorites: function (favorite) {
        var deferred = $q.defer();
        $http.post(CONFIG.baseUrlApi + '/favorite/sendToFavorite/', favorite)
          .success(function (data) {

            deferred.resolve(data)

          }).error(function (data) {

          deferred.reject(false);
        });
        return deferred.promise
      }
    }
	});
