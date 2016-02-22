'use strict';

/**
 * @ngdoc service
 * @name chairmanApp.note
 * @description
 * # note
 * Factory in the chairmanApp.
 */
angular.module('chairmanApp')
  .factory('note', function (CONFIG, $http, notification, $rootScope, $q) {

    return {
      sendNoteToSpeaker: function (noteToSend) {
        var deferred = $q.defer();
        $http.post(CONFIG.baseUrlApi + '/note/sendToSpeaker', noteToSend)
          .success(function(data) {
            notification.writeNotification(data);
            deferred.resolve(data);
          }).error(function(data) {
            notification.writeNotification(data);
            deferred.reject(false);
          });
        return deferred.promise;
      },

    };
  });
