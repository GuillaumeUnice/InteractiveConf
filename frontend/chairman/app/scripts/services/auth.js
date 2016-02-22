'use strict';

/**
 * @ngdoc service
 * @name chairmanApp.auth
 * @description
 * # auth is a Factory which connect user in the app and get the socket's token
 */
angular.module('chairmanApp')
  .factory('auth', function (CONFIG, $http, notification, $rootScope, $q) {

    return {

      login: function (data) {
        var deferred = $q.defer();
        $http.post(CONFIG.baseUrlApi + '/auth/login', data)
          .success(function(data) {

            notification.writeNotification(data);
            deferred.resolve(data);
            $rootScope.tokenSocket = data.token;

          }).error(function(data) {
            notification.writeNotification(data);
            deferred.reject(false);
          });
        return deferred.promise;
      }
    };
  });
