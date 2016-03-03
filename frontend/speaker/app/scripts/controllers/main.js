'use strict';

/**
 * @ngdoc function
 * @name speaker.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the speaker
 */
angular.module('speaker')
.controller('MainCtrl', function (CONFIG, $scope, $http, $interval, $q, backendSocket) 
{


  /* TIMER */

  $scope.timerRunning = true;

  backendSocket.on('timereyecatcher', function(){
    $scope.timerEyeCatcher();
  });

  $scope.timerEyeCatcher = function(){
    // TODO some css anime
  };

  $scope.startTimer = function(){
    $scope.$broadcast('timer-resume');
    $scope.timerRunning = true;
  };

  $scope.stopTimer = function(){
    $scope.$broadcast('timer-stop');
    $scope.timerRunning = false;
  };

  $scope.resetTimer = function(){
    $scope.$broadcast('timer-start');
    $scope.timerRunning = true;
    // $scope.$broadcast('timer-stop');
    // $scope.timerRunning = false;
  };


  /* QUESTION */
  
  $scope.questionQueue = [];

  $scope.question = {};
  $scope.question.isDisplayed = false;

/* // no more progress bar
  var pBar = {};
  pBar.interval = null;
  pBar.initVal = 0;
  pBar.val = 0;
  pBar.maxVal = 100;
  pBar.totDelay = 30000;
  pBar.refreshDelay = 100;
  pBar.incVal = pBar.maxVal * pBar.refreshDelay / pBar.totDelay;

  $scope.progressBarVal = pBar.initVal;
  $scope.progressBarMaxVal = pBar.maxVal;
  $scope.progressBarDisplay = false;
*/

  backendSocket.on('question', function (question){
    // console.log(question);
    $scope.addQuestionToQueue(question);
  });

  $scope.addQuestionToQueue = function (question){
    // console.log('newQuestion');
    var newQuestion = question;
    newQuestion.receivedAt = Date.now();
    newQuestion.slide = (question.num_slide === null) ? "" : " Slide n°" + question.num_slide;
    //newQuestion.name = question.public_id; // aller le chercher en bdd
    newQuestion.isDisplayed = false;
    $scope.questionQueue.push(newQuestion);
    // console.log($scope.question);

    // si on a pas de question en cours on met celle que l'on vient d'ajouter
    if($scope.question.isDisplayed === false) {
      // console.log('first manage');
      $scope.manageQuestionQueue();
    }
  };

  $scope.manageQuestionQueue = function (){
    // console.log('manage');
    $scope.question.isDisplayed = false;

/* // no more progress bar
    $interval.cancel(pBar.interval);
    $scope.progressBarVal = pBar.initVal;
    pBar.val = pBar.initVal;
*/

    if ($scope.questionQueue.length > 0) {

      var index = 0;
      var minTmp = $scope.questionQueue[index].receivedAt;
      for (var i = index; i < $scope.questionQueue.length; i++) {
        if ($scope.questionQueue[i].receivedAt < minTmp) {
          minTmp = $scope.questionQueue[i].receivedAt;
          index = i;
        }
      }

      $scope.question = $scope.questionQueue[index];
      $scope.question.isDisplayed = true;

      $scope.questionQueue.splice(index, 1);

/* // no more progress bar
      // si plus de 5 questions
      if ($scope.questionQueue.length > 3) {
  
        pBar.interval = $interval(function() {
          // si progress bar pas pleine
          if ($scope.progressBarVal < $scope.progressBarMaxVal) {
            $scope.progressBarVal += pBar.incVal;
            pBar.val += pBar.incVal;
          }
          else if (pBar.val < $scope.progressBarMaxVal*1.01) {
            pBar.val += pBar.incVal;
            // delay de 1% 'pour que ca soit joli'
          }
          else {
            // si pleine on arrete l'interval et on envoie la question a l'assistant
            $interval.cancel(pBar.interval);
            $scope.sendQuestionToAssistant();
          }
        }, pBar.refreshDelay);
        
        $scope.progressBarDisplay = true;
      }
      else {
        $scope.progressBarDisplay = false;
      }
*/
    }

  };


  $scope.sendQuestionToScreen = function (){

    var questionToSend = $scope.question;
    delete questionToSend.receivedAt;
    delete questionToSend.slide;
    delete questionToSend.isDisplayed;

    $http.post(CONFIG.baseUrlQuestion + '/sendToScreen', questionToSend)
      .success(function(data) {
        // console.log('succes to screen ' + data);
        $scope.manageQuestionQueue();
      }).error(function(data) {
        console.log('fail' + data);
      });
  };

  $scope.sendQuestionToAssistant = function (){
    var questionToSend = $scope.question;
    delete questionToSend.receivedAt;
    delete questionToSend.slide;
    delete questionToSend.isDisplayed;
    // console.log(questionToSend);

    $http.post(CONFIG.baseUrlQuestion + '/sendToChairmanEndQuestion', questionToSend)
      .success(function(data) {
        // console.log('succes to assistant ' + data);
        $scope.manageQuestionQueue();
      }).error(function(data) {
        console.log('fail' + data);
      });
  };


  /* NOTE */

  $scope.note = '';
  

  backendSocket.on('note', function (note){
    $scope.newNote(note);
  });


  $scope.newNote = function (note){
    console.log('newNote');
    $scope.note = note.content;
  };

  /* END QUESTION */

  $scope.endQuestionMode = false;
  $scope.endQuestionCpt = 0;
  $scope.endQuestions = {};
  

  $scope.toggleEndQuestionMode = function (){
    console.log('newEndQuestion');
    $scope.endQuestionMode = !$scope.endQuestionMode;
    if ($scope.endQuestionMode) {
      $scope.getEndQuestions().then(function(questions){
        for (var i = 0; i < questions.length; i++) {
          $scope.newEndQuestion(questions[i]);
        }
        console.log($scope.endQuestions);
      }, function(err){
        console.log('erreur promesses : ' + err);
      });
    }
  };



  backendSocket.on('endQuestion', function (newQuestion){
    $scope.newEndQuestion(newQuestion);
  });


  $scope.newEndQuestion = function (newQuestion){
    console.log('newEndQuestion');
    if ($scope.endQuestions[newQuestion.id] === undefined) {
      $scope.endQuestionCpt++;
    }
    $scope.endQuestions[newQuestion.id] = newQuestion;
  };

  $scope.removeEndQuestion = function (questionId){
    console.log('removeEndQuestion');
    console.log(questionId);
    if ($scope.endQuestions[questionId] !== undefined) {
      $scope.endQuestionCpt--;
    }
    delete $scope.endQuestions[questionId];
    // $scope.endQuestionEmpty = true;
  };

  $scope.getEndQuestions = function (){
    console.log('getEndQuestions');
    var deferred = $q.defer();
    $http.get(CONFIG.baseUrlQuestion + '/status/' + CONFIG.QUESTION_STATUS_SENT)
      .success(function(data) {
        console.log(data);
        deferred.resolve(data);
      }).error(function(data) {
        console.log('fail' + data);
        deferred.reject(false);
      });
      return deferred.promise;
  };

  $scope.sendEndQuestionToScreen = function (question){

    var questionToSend = question;
    questionToSend.num_slide = questionToSend.numSlide;
    // questionToSend['num_slide'] = questionToSend.numSlide;

    $http.post(CONFIG.baseUrlQuestion + '/sendToScreen', questionToSend)
      .success(function(data) {
        console.log('succes to screen ' + data);
        $scope.removeEndQuestion(questionToSend.id);
        console.log('succes to screen ' + data);
      }).error(function(data) {
        console.log('fail' + data);
      });
  };

});
