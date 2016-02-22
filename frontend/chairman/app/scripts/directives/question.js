'use strict';

/**
 * @ngdoc directive
 * @name chairmanApp.directive:ngQuestion
 * @description
 * # ngQuestion
 */
angular.module('chairmanApp')
  .directive('ngQuestion', function () {
    return {
      templateUrl: 'views/question.html',
      restrict: 'E',

      scope: {
      	question: '=',
      	answerQuestionToPublic: '&',
      	mergeQuestionToChairman: '&',
      	sendQuestionToSpeaker: '&',
      	maskQuestionToChairman: '&',
      	chooseAsMainMergeQuestion: '&',
      	addToMergeQuestion: '&',
        removeToMergeQuestion: '&',
      },
      link: function($scope, iElem, iAttr){
          $scope.displaySelectedQuestion = true;
          //$scope.displaySelectedQuestion = ($scope.question.selected) ? false : true;
          $scope.ChangeDisplaySelectedQuestion = function() {
            $scope.displaySelectedQuestion = !$scope.displaySelectedQuestion;
          };

          $scope.sendAnswerQuestionToPublic = function(answerToQuestion) {
            $scope.answerQuestionToPublic({answer: answerToQuestion});
          };

          $scope.displayQuestionForm = false;
          $scope.ChangeDisplayQuestionForm = function(){
            $scope.displayQuestionForm = !$scope.displayQuestionForm;
          };

          $scope.answerQuestionToPublicExist = angular.isUndefined(iAttr.answerQuestionToPublic) === false;
          $scope.mergeQuestionToChairmanExist = angular.isUndefined(iAttr.mergeQuestionToChairman) === false;
          $scope.sendQuestionToSpeakerExist = angular.isUndefined(iAttr.sendQuestionToSpeaker) === false;
          $scope.maskQuestionToChairmanExist = angular.isUndefined(iAttr.maskQuestionToChairman) === false;
          $scope.chooseAsMainMergeQuestionExist = angular.isUndefined(iAttr.chooseAsMainMergeQuestion) === false;
          $scope.addToMergeQuestionExist = angular.isUndefined(iAttr.addToMergeQuestion) === false;
          $scope.removeToMergeQuestionExist = angular.isUndefined(iAttr.removeToMergeQuestion) === false;
      }
    };
  });
