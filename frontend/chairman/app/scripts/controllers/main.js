'use strict';

/**
 * @ngdoc function
 * @name chairmanApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the chairmanApp
 */
angular.module('chairmanApp')
  .controller('MainCtrl', function ($scope, CONFIG, socketQuestion, question)
  {
    /**
     * function wich call server in order to recover all questions
     * It's useful when you connect at the API or when you reconnect (loose connection)
     */
    function loadQuestion() {
      question.loadQuestion().then(function(questions){
        angular.forEach(questions, function(value, key) {
          $scope.manageQuestion(questions[key]);
        });
      }, function(msg){
        console.log('erreur promesses : ' + msg);
      });
    }

    // initialize
    $scope.displayOverlay = false;
    $scope.questionsMerge = [];
    $scope.questions = [];
    $scope.questionsSpeaker = [];
    /**
     * Connect to the socket resource : 'reconnectSocket'
     * This event it's produce when you loose connection
     * @param  {Object} event
     * @param  {Object} contains all information send by the socket Service
     */
    $scope.$on('reconnectSocket', function(event, args) {
      loadQuestion();
    });

    /**
     * Listen at the resource : 'loginChanged'
     * It's the pattern Observer to know where the controller can query to the API
     * @param  {Object} event
     * @param  {Object} contains all information send by the Observer pattern
     */
    $scope.$on('loginChanged', function(event, args) {

      loadQuestion();

      socketQuestion.init(args.token);
      socketQuestion.on('question', function(questionReceive) {

        $scope.manageQuestion(questionReceive);
      });
      socketQuestion.on('vote', function(questionReceive) {
        console.log(questionReceive);
        $scope.manageVote(questionReceive);
      });

    });

    /**
     * Distribute all question receive in real time by the server
     * @param  {Object} questionReceive contains all information about the new question receive
     */
    $scope.manageQuestion = function(questionReceive) {

      // convert Date
      questionReceive.created_at = new Date(questionReceive.created_at.replace(' ', 'T')).getTime() / 1000;

      if(questionReceive.status_code === CONFIG.QUESTION_STATUS_SENT) {
        var elementPos = $scope.questionsSpeaker.map(function(x) {return x.id; }).indexOf(questionReceive.id);
        if(elementPos !== -1) { // if elem exist already
          $scope.questionsSpeaker[elementPos] = questionReceive;
        } else {
          $scope.questionsSpeaker.push(questionReceive);
        }
      } else if((questionReceive.status_code === CONFIG.QUESTION_STATUS_MERGED)
          || (questionReceive.status_code === CONFIG.QUESTION_STATUS_VALIDATED)){
        var elementPos = $scope.questions.map(function(x) {return x.id; }).indexOf(questionReceive.id);
        if(elementPos !== -1) { // if elem exist already
          $scope.questions[elementPos] = questionReceive;
        } else {
          $scope.questions.push(questionReceive);
        }

      }
      //$scope.$apply();
    };

    /**
     * Update a question
     * @param  {Object} question update
     */
    $scope.manageVote = function(question){

      for (var i = 0 ; i < $scope.questions.length ;i++) {

        if($scope.questions[i].id == question.id){
          $scope.questions[i] = question;
          break;
        }
      }

    };

    /**
     * Send to the server the new schedule of end question
     * @type {Object}
     */
    $scope.sortableOptions = {
      update: function(e, ui) {
        if (ui.item.sortable.model === "can't be moved") {
          ui.item.sortable.cancel();
        }
        question.sendSpeakerEndQuestion($scope.questionsSpeaker).then(function(/*data*/){
        }, function(msg){
          console.log('erreur promesses : ' + msg);
        });

        // TODO add method send endQuestion
        //console.log('sendSpeakerEndQuestion');
      },
      axis: 'y'
    };

    // initialize by default the question's filter when you start the App
  	$scope.predicate = 'created_at';
    $scope.reverse = true;
    /**
     * update filter of question
     * @param  {String} predicate contain the attribut (created_at or up_vote) name on what the filter is apply
     */
    $scope.order = function(predicate) {
        $scope.reverse = ($scope.predicate === predicate) ? !$scope.reverse : false;
        $scope.predicate = predicate;
    };

    /**
     * Send all question for end session in a tab at the server
     * @param  {Array} questionToSend Array who contains all question
     */
    $scope.sendQuestionToSpeaker = function(questionToSend) {
      question.sendQuestionToSpeaker(questionToSend).then(function(data){
        if(data.status === CONFIG.JSON_STATUS_SUCCESS) {
          $scope.questions.splice($scope.questions.indexOf(questionToSend), 1);
        }
      }, function(msg){
        console.log('erreur promesses : ' + msg);
      });
    };

    /**
     * Send response at a question to the server
     * @param  {Object} questions the question concerned by the answer
     * @param  {String} answer the content of the answer
     */
    $scope.answerQuestionToPublic = function(questions, answer) {

      var questionAndAnswer = JSON.stringify({ question: questions, response: answer });

      question.sendAnswerToPublic(questionAndAnswer).then(function(data){
        console.log(questions);
        if(data.status === CONFIG.JSON_STATUS_SUCCESS) {
          var elementPos;
          // refind correct question's array
          if(questions.status_code === CONFIG.QUESTION_STATUS_SENT) {
            $scope.questionsSpeaker.splice($scope.questionsSpeaker.indexOf(questions), 1);
          } else {
            $scope.questions.splice($scope.questions.indexOf(questions), 1);
          }
        }
      }, function(msg){
        console.log('erreur promesses : ' + msg);
      });
    };

    /**
     * Send the question mask to the server in order to update is current status code
     * @param  {Object} questionMask the question which be mask
     */
    $scope.maskQuestionToChairman = function(questionMask, sendToServer) {

      if(sendToServer === undefined) {
        sendToServer = true;
      }
      if(sendToServer) {
         question.deleteQuestionByChairman(questionMask).then(function(data){

          // refind correct question's array
          if(questionMask.status_code === CONFIG.QUESTION_STATUS_SENT) {
             $scope.questionsSpeaker.splice($scope.questionsSpeaker.indexOf(questionMask), 1);
          } else {
            $scope.questions.splice($scope.questions.indexOf(questionMask), 1);
          }
        }, function(msg){
          console.log('erreur promesses : ' + msg);
        });
      } else {
          // refind correct question's array
          if(questionMask.status_code === CONFIG.QUESTION_STATUS_SENT) {
             $scope.questionsSpeaker.splice($scope.questionsSpeaker.indexOf(questionMask), 1);
          } else {
            $scope.questions.splice($scope.questions.indexOf(questionMask), 1);
          }
      }


      //$scope.questions = $scope.questions.filter(item => item !== questionMask);
    };

    /**
     * Display the question-merge's interface
     * And select the main question for the merge
     * @param  {Object} questionMerge this question will be conserved
     */
    $scope.mergeQuestionToChairman = function(questionMerge) {
      /*
        var elementPos = $scope.questions.map(function(x) {return x.id; }).indexOf(questionMerge.id);
        //var objectFound = $scope.questions[elementPos];
        $scope.questions.splice(elementPos, 1);
      */
      $scope.questions.splice($scope.questions.indexOf(questionMerge), 1);

      $scope.displayOverlay = true;

      if($scope.questionsMerge[0] === undefined) {
        $scope.questionsMerge = [];
        $scope.questionsMerge[0] = questionMerge;
      } else if (questionMerge.id !== $scope.questionsMerge[0].id) {
        $scope.questionsMerge = [];
        $scope.questionsMerge[0] = questionMerge;
      }

    };

    /**
     * Cancel the merge questions and push the main merge question into the questions' array
     */
    $scope.cancelMergeQuestion = function() {
      $scope.questions.push($scope.questionsMerge[0]);
      // todo : erase selected question
    };

    /**
     * Send to server the main question and a tab which contains all questions merged
     * so attached at the main question]
     */
    $scope.validateMergeQuestion = function() {

      var questionMerged = JSON.stringify({
        mainQuestion: $scope.questionsMerge[0],
        otherQuestions: $scope.questionsMerge.slice(1, $scope.questionsMerge.length)
      });

      question.sendMergedQuestion(questionMerged).then(function(data){
        if(data.status === CONFIG.JSON_STATUS_SUCCESS) {
          // delete question for chairman
          $scope.questions.push($scope.questionsMerge.shift()); // shift remove the first item of $scope.questionsMerge
          angular.forEach($scope.questionsMerge, function(value) {
            $scope.maskQuestionToChairman(value, false);
          });
        }
      }, function(msg){
        console.log('erreur promesses : ' + msg);
      });

    };

    /**
     * Change the main question to an other
     * @param  {Object} question the new main question
     * @param  {Object} test the old main question
     */
    $scope.chooseAsMainMergeQuestion = function(question, test) {
      // delete question in questionsMerge if question was already selected
      $scope.questionsMerge.splice($scope.questionsMerge.indexOf(question), 1);

      // find indexOf question by question's id if nothing find return -1
      var elementPos = $scope.questions.map(function(x) {return x.id; }).indexOf(question.id);

      var temp = test;//$scope.questionsMerge[0];
      $scope.questionsMerge[0] = $scope.questions[elementPos];
      temp.selected = true;
      $scope.questions[elementPos] = temp;

    };

    /**
     * Add a question in the current merge of question
     * @param {Object} questionAdd the new question merged
     */
    $scope.addToMergeQuestion = function(questionAdd) {
      var elementPos = $scope.questionsMerge.map(function(x) {return x.id; }).indexOf(questionAdd.id);
      if(elementPos === -1) {
        $scope.questionsMerge.push(questionAdd);
      }
    };
    /**
     * Remove a question int the current merge of question
     * @param  {Object} questionRemove the question which left the current merge
     */
    $scope.removeToMergeQuestion = function(questionRemove) {
      $scope.questionsMerge = $scope.questionsMerge.filter(
        function (question) {
          return question !== questionRemove;
        }
      );

    };

  });
