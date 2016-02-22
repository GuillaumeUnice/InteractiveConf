'use strict';

/**
 * @ngdoc service
 * @name Moderator.tweet
 * @description
 * # tweet
 * Factory in the Moderator.
 */
angular.module('Moderator')
  .factory('tweet', function (CONFIG, $http, notification, $rootScope, $q) {
    // Service logic
    // ...

   return {
      removeTweet: function (tweetToSend) {
         var deferred = $q.defer();
        $http.delete(CONFIG.baseUrlApi + '/tweet/sendToPublic', tweetToSend)
          .success(function(data) {
            notification.writeNotification(data);
            deferred.resolve(data);
          }).error(function(data) {
            notification.writeNotification(data);
            deferred.reject(false);
          });
        return deferred.promise;
      },

      validateTweet: function (tweetToSend) {
         var deferred = $q.defer();
        $http.put(CONFIG.baseUrlApi + '/tweet/sendToScreen', tweetToSend)
          .success(function(data) {
            notification.writeNotification(data);
            deferred.resolve(data);
          }).error(function(data) {
            notification.writeNotification(data);
            deferred.reject(false);
          });
        return deferred.promise;
      }
    }
  });

