'use strict';

/**
 * @ngdoc function
 * @name chairmanApp.controller:SpeakerCtrl
 * @description
 * # SpeakerCtrl
 * Controller of the chairmanApp
 */
angular.module('chairmanApp')
  .controller('SpeakerCtrl', function ($scope, CONFIG, $http, question,  note) {
  	
    //initialize
    $scope.note = {};
    
  	$scope.sendQuestionSpeaker = function(questionSend) {
      question.addAndSendQuestionToSpeaker(questionSend).then(function(data){
        if(data.status === CONFIG.JSON_STATUS_SUCCESS) {
          $scope.question = '';
        }
      }, function(msg){
        console.log('erreur promesses : ' + msg);
      });

  	};

  	$scope.sendNoteSpeaker = function(noteSend) {
      note.sendNoteToSpeaker(noteSend).then(function(data){
        if(data.status === CONFIG.JSON_STATUS_SUCCESS) {
          $scope.note.content = '';
        }
      }, function(msg){
        console.log('erreur promesses : ' + msg);
      });
  	};

  	$scope.sendNotificationTimeSpeaker = function() {

      var noteSend = {
        content: "Attention au temps!!!"
      };
      note.sendNoteToSpeaker(noteSend).then(function(data){
        if(data.status === CONFIG.JSON_STATUS_SUCCESS) {
        }
      }, function(msg){
        console.log('erreur promesses : ' + msg);
      });
  	};
  });
