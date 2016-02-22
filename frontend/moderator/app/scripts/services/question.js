'use strict';

/**
 * @ngdoc service
 * @name Moderator.question
 * @description
 * # question
 * Factory in the Moderator.
 */
angular.module('Moderator')
  .factory('question', function ($http, notification, $rootScope, $q, CONFIG) {
    // Service logic
    // ...

    return {
      removeQuestion: function (questionToRemove , idQuestion) {
         var deferred = $q.defer();
        $http.post(CONFIG.baseUrlApi + '/question/sendToPublic/'+idQuestion, questionToRemove)
          .success(function(data) {
            notification.writeNotification(data);
            deferred.resolve(data);
          }).error(function(data) {
            notification.writeNotification(data);
            deferred.reject(false);
          });
        return deferred.promise;
      },

     validateQuestion: function (questionToSend, idQuestion) {

       var deferred = $q.defer();
      $http.put(CONFIG.baseUrlApi + '/question/sendToChairman/'+idQuestion, questionToSend)
        .success(function(data) {
         notification.writeNotification(data);
          deferred.resolve(data);
        }).error(function(data) {
        notification.writeNotification(data);
          deferred.reject(false);
        });
      return deferred.promise;
    }
    };
  });
