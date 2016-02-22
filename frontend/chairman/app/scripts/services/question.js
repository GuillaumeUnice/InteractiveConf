'use strict';

/**
 * @ngdoc service
 * @name chairmanApp.question
 * @description
 * # question
 * Factory in the chairmanApp.
 */
angular.module('chairmanApp')
  .factory('question', function (CONFIG, $http, notification, $rootScope, $q) {

    return {
      sendQuestionToSpeaker: function (questionToSend) {
        console.log(questionToSend);
         var deferred = $q.defer();
        $http.post(CONFIG.baseUrlQuestion + '/sendToSpeaker', questionToSend)
          .success(function(data) {
            notification.writeNotification(data);
            deferred.resolve(data);
          }).error(function(data) {
            notification.writeNotification(data);
            deferred.reject(false);
          });
        return deferred.promise;
      },
      addAndSendQuestionToSpeaker: function (questionContentToSend) {
        console.log(questionContentToSend);
         var deferred = $q.defer();
        $http.post(CONFIG.baseUrlQuestion + '/addAndSendToSpeaker', questionContentToSend)
          .success(function(data) {
            notification.writeNotification(data);
            deferred.resolve(data);
          }).error(function(data) {
            notification.writeNotification(data);
            deferred.reject(false);
          });
        return deferred.promise;
      },
      sendSpeakerEndQuestion: function (questionsSpeaker) {
        console.log(questionsSpeaker);
        var deferred = $q.defer();
        $http.post(CONFIG.baseUrlQuestion + '/sendSpeakerEndQuestion', questionsSpeaker)
          .success(function(data) {
            notification.writeNotification(data);
            deferred.resolve(data);
          }).error(function(data) {
            notification.writeNotification(data);
            deferred.reject(false);
          });
        return deferred.promise;
      },
      sendMergedQuestion: function (questionMerged) {
        console.log(questionMerged);
        var deferred = $q.defer();
        $http.post(CONFIG.baseUrlQuestion + '/sendMergedQuestion', questionMerged)
          .success(function(data) {
            notification.writeNotification(data);
            deferred.resolve(data);
          }).error(function(data) {
            notification.writeNotification(data);
            deferred.reject(false);
          });
        return deferred.promise;
      },
      sendAnswerToPublic: function (questionAndAnswer) {
        var deferred = $q.defer();
        $http.post(CONFIG.baseUrlQuestion + '/sendAnswerToPublic', questionAndAnswer)
          .success(function(data) {
            notification.writeNotification(data);
            deferred.resolve(data);
          }).error(function(data) {
            notification.writeNotification(data);
            deferred.reject(false);
          });
        return deferred.promise;
      },
      loadQuestion: function () {
        var deferred = $q.defer();
        $http.get(CONFIG.baseUrlQuestion)
          .success(function(data) {
            //notification.writeNotification(data);
            deferred.resolve(data);
          }).error(function(data) {
            //notification.writeNotification(data);
            deferred.reject(false);
          });
        return deferred.promise;
      },
      deleteQuestionByChairman: function (questionToDelete) {
        var deferred = $q.defer();
        $http.post(CONFIG.baseUrlQuestion + '/deleteQuestionByChairman', questionToDelete)
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
