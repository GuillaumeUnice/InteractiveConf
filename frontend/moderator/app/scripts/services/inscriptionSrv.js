'use strict';

/**
 * @ngdoc service
 * @name Moderator.inscription
 * @description
 * # inscription
 * Service in the Moderator.
 */
angular.module('Moderator')
  .service('inscription', function ($q , $http, CONFIG) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    return {
      createUser : function(user){
        var deferred = $q.defer();
        $http.post(CONFIG.baseUrlApi + "/auth/signup" , user)
          .success(function(data){
            deferred.resolve(data);
          })
          .error(function(data){
            deferred.reject(false);
          });
        return deferred.promise;
      }
    }
  });
