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

    function loadQuestion() {
      question.loadQuestion().then(function(questions){
        angular.forEach(questions, function(value, key) {
          $scope.manageQuestion(questions[key]);
        });
      }, function(msg){
        console.log('erreur promesses : ' + msg);
      });
    }

    $scope.displayOverlay = false;

    $scope.$on('reconnectSocket', function(event, args) {
      loadQuestion();
    });

    $scope.$on('loginChanged', function(event, args) {

      loadQuestion();

      socketQuestion.init(args.token);
      socketQuestion.on('question', function(questionReceive) {
        
        //console.log(questionReceive);
        $scope.manageQuestion(questionReceive);
      });  
      socketQuestion.on('vote', function(questionReceive) {
        console.log(questionReceive);
        $scope.manageVote(questionReceive);
      }); 

    });


    $scope.manageQuestion = function(questionReceive) {
      
      // converte Date
      questionReceive.created_at = new Date(questionReceive.created_at.replace(' ', 'T')).getTime() / 1000;
     
      if(questionReceive.status_code === CONFIG.QUESTION_STATUS_SENT) {
        var elementPos = $scope.questionsSpeaker.map(function(x) {return x.id; }).indexOf(questionReceive.id);
        if(elementPos !== -1) { // if elem exist already
          $scope.questionsSpeaker[elementPos] = questionReceive;
        } else {
          $scope.questionsSpeaker.push(questionReceive);
        } 
        //$scope.questionsSpeaker.push(questionReceive);
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

    $scope.manageVote = function(question){

      for (var i = 0 ; i < $scope.questions.length ;i++) {

        if($scope.questions[i].id == question.id){
          $scope.questions[i] = question;
          break;
        }
      }

    };

    //socketQuestion.init();
  	/*socketQuestion.on('moderator', function(msg) {
      $scope.questions.push(msg);
      $scope.$apply;
  		console.log(msg);
  	});*/
    /*
      socketQuestion.on(eventName, function (msg) {
        //var args = arguments;
        
        $rootScope.$apply(function () {
          callback.apply(socket, args);
        });
      });
    */

  	$scope.questions = [
  /*  {'id' :  6, 'name' : 'Jhon Doe', 'status_code' : 5, 'up_vote' : 44, 'num_slide' : 3, 'content' : 'Ceci est la question 1', 'created_at' : '1453222958'},
    {'id' :  7, 'name' : 'Jhon Doe', 'status_code' : 5, 'up_vote' : 22, 'num_slide' : null, 'content' : 'Ceci est la question 2', 'created_at' : '1449409528'},
    {'id' :  8, 'name' : 'Jhon Doe', 'status_code' : 5, 'up_vote' : 33, 'num_slide' : null, 'content' : 'Ceci est la question 3', 'created_at' : '1449409529'}
  /*		{'id' :  1, 'name' : 'Jhon Doe', 'status_code' : 5, 'up' : 1, 'slide_start' : null, 'slide_stop' : null, 'content' : 'La faille Hearthbleed entre t\'elle dans cette catégorie de faille?', 'created_at' : '1449409522'},
  		{'id' :  2, 'name' : 'Jhon Doe', 'status_code' : 5, 'up' : 5, 'slide_start' : 3, 'slide_stop' : 3, 'content' : 'Ceci est la question 2?', 'created_at' : '21449409521'},
  		{'id' :  3, 'name' : 'Jhon Doe', 'status_code' : 5, 'up' : 4, 'slide_start' : 2, 'slide_stop' : 4, 'content' : 'Ceci est la question 2?', 'created_at' : '1449409521'},
  		{'id' :  4, 'name' : 'Jhon Doe', 'status_code' : 5, 'up' : 12, 'slide_start' : 2, 'slide_stop' : 4, 'content' : 'La faille Hearthbleed entre t\'elle dans cette catégorie de faille?', 'created_at' : '1449409522'},
  		{'id' :  5, 'name' : 'Jhon Doe', 'status_code' : 5, 'up' : 6, 'slide_start' : 2, 'slide_stop' : 4, 'content' : 'Ceci est la question 2?', 'created_at' : '21449409521'},
  		{'id' :  6, 'name' : 'Jhon Doe', 'status_code' : 5, 'up' : 40, 'slide_start' : 2, 'slide_stop' : 4, 'content' : 'Ceci est la question 2?', 'created_at' : '1449409521'},
  		{'id' :  7, 'name' : 'Jhon Doe', 'status_code' : 5, 'up' : 14, 'slide_start' : 2, 'slide_stop' : 4, 'content' : 'La faille Hearthbleed entre t\'elle dans cette catégorie de faille?', 'created_at' : '1449409522'},
  		{'id' :  8, 'name' : 'Jhon Doe', 'status_code' : 5, 'up' : 9, 'slide_start' : 2, 'slide_stop' : 4, 'content' : 'Ceci est la question 2?', 'created_at' : '21449409521'},
  		{'id' :  9, 'name' : 'Jhon Doe', 'status_code' : 5, 'up' : 42, 'slide_start' : 2, 'slide_stop' : 4, 'content' : 'Ceci est la question 2?', 'created_at' : '1449409521'},
*/

      /*
      {'id' :  1, 'name' : 'Jhon Doe', 'up' : 1, 'content' : 'La faille Hearthbleed entre t\'elle dans cette catégorie de faille?', 'created_at' : '1449409522'},
      {'id' :  2, 'name' : 'Jhon Doe', 'up' : 5, 'content' : 'Ceci est la question 2?', 'created_at' : '21449409521'},
      {'id' :  3, 'name' : 'Jhon Doe', 'up' : 4, 'content' : 'Ceci est la question 2?', 'created_at' : '1449409521'},
      {'id' :  4, 'name' : 'Jhon Doe', 'up' : 12, 'content' : 'La faille Hearthbleed entre t\'elle dans cette catégorie de faille?', 'created_at' : '1449409522'},
      {'id' :  5, 'name' : 'Jhon Doe', 'up' : 6, 'content' : 'Ceci est la question 2?', 'created_at' : '21449409521'},
      {'id' :  6, 'name' : 'Jhon Doe', 'up' : 40, 'content' : 'Ceci est la question 2?', 'created_at' : '1449409521'},
      {'id' :  7, 'name' : 'Jhon Doe', 'up' : 14, 'content' : 'La faille Hearthbleed entre t\'elle dans cette catégorie de faille?', 'created_at' : '1449409522'},
      {'id' :  8, 'name' : 'Jhon Doe', 'up' : 9, 'content' : 'Ceci est la question 2?', 'created_at' : '21449409521'},
      {'id' :  9, 'name' : 'Jhon Doe', 'up' : 42, 'content' : 'Ceci est la question 2?', 'created_at' : '1449409521'},
      */
  	
  	];

    $scope.questionsSpeaker = [
     /* {'id' :  1, 'name' : 'Jhon Doe', 'status_code' : 25, 'up' : 1, 'slide_start' : null, 'slide_stop' : null, 'content' : 'La faille Hearthbleed entre t\'elle dans cette catégorie de faille?', 'created_at' : '1449409522'},
      {'id' :  2, 'name' : 'Jhon Doe', 'status_code' : 25, 'up' : 5, 'slide_start' : 3, 'slide_stop' : 3, 'content' : 'Ceci est la question 2?', 'created_at' : '21449409521'},
      {'id' :  3, 'name' : 'Jhon Doe', 'status_code' : 25, 'up' : 4, 'slide_start' : 2, 'slide_stop' : 4, 'content' : 'Ceci est la question 2?', 'created_at' : '1449409521'},
      {'id' :  4, 'name' : 'Jhon Doe', 'status_code' : 25, 'up' : 12, 'slide_start' : 2, 'slide_stop' : 4, 'content' : 'La faille Hearthbleed entre t\'elle dans cette catégorie de faille?', 'created_at' : '1449409522'},
      {'id' :  5, 'name' : 'Jhon Doe', 'status_code' : 25, 'up' : 6, 'slide_start' : 2, 'slide_stop' : 4, 'content' : 'Ceci est la question 2?', 'created_at' : '21449409521'},
      {'id' :  6, 'name' : 'Jhon Doe', 'status_code' : 25, 'up' : 40, 'slide_start' : 2, 'slide_stop' : 4, 'content' : 'Ceci est la question 2?', 'created_at' : '1449409521'},
      {'id' :  7, 'name' : 'Jhon Doe', 'status_code' : 25, 'up' : 14, 'slide_start' : 2, 'slide_stop' : 4, 'content' : 'La faille Hearthbleed entre t\'elle dans cette catégorie de faille?', 'created_at' : '1449409522'},
      {'id' :  8, 'name' : 'Jhon Doe', 'status_code' : 25, 'up' : 9, 'slide_start' : 2, 'slide_stop' : 4, 'content' : 'Ceci est la question 2?', 'created_at' : '21449409521'},
      {'id' :  9, 'name' : 'Jhon Doe', 'status_code' : 25, 'up' : 42, 'slide_start' : 2, 'slide_stop' : 4, 'content' : 'Ceci est la question 2?', 'created_at' : '1449409521'},
    */
    ]; 

    $scope.questionsMerge = [];

    $scope.sortableOptions = {
      update: function(e, ui) {
        if (ui.item.sortable.model === "can't be moved") {
          ui.item.sortable.cancel();
        }
        question.sendSpeakerEndQuestion($scope.questionsSpeaker).then(function(/*data*/){
        }, function(msg){
          console.log('erreur promesses : ' + msg);
        });
        
        // add metod send endQuestion
        console.log('sendSpeakerEndQuestion');
      },
      axis: 'y'
    };

  	$scope.predicate = 'created_at';
    $scope.reverse = true;
    $scope.order = function(predicate) {
        $scope.reverse = ($scope.predicate === predicate) ? !$scope.reverse : false;
        $scope.predicate = predicate;
    };


    $scope.sendQuestionToSpeaker = function(questionToSend) {
      question.sendQuestionToSpeaker(questionToSend).then(function(data){
        if(data.status === CONFIG.JSON_STATUS_SUCCESS) {
          $scope.questions.splice($scope.questions.indexOf(questionToSend), 1);
        }
      }, function(msg){
        console.log('erreur promesses : ' + msg);
      });
    };

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

    $scope.maskQuestionToChairman = function(questionMask) {
      question.deleteQuestionByChairman(questionMask).then(function(data){
        console.log(questionMask);
        // refind correct question's array
        if(questionMask.status_code === CONFIG.QUESTION_STATUS_SENT) {
           $scope.questionsSpeaker.splice($scope.questionsSpeaker.indexOf(questionMask), 1);
        } else {
          $scope.questions.splice($scope.questions.indexOf(questionMask), 1);
        }
      }, function(msg){
        console.log('erreur promesses : ' + msg);
      });
    };


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

    $scope.cancelMergeQuestion = function() {
      $scope.questions.push($scope.questionsMerge[0]);
      // todo : erase selected question
      /*angular.forEach($scope.questions, function(value, key) {
        $scope.questions[key].selected = false;
      });*/
    };

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
            $scope.maskQuestionToChairman(value);
          });
        }
      }, function(msg){
        console.log('erreur promesses : ' + msg);
      });

    };


    $scope.chooseAsMainMergeQuestion = function(question, test) {
      // delete question in questionsMerge if question was already selected
      $scope.questionsMerge.splice($scope.questionsMerge.indexOf(question), 1);

      // find indexOf question by question's id if nothing find return -1
      var elementPos = $scope.questions.map(function(x) {return x.id; }).indexOf(question.id);
      console.log(test);
      var temp = test;//$scope.questionsMerge[0];
      $scope.questionsMerge[0] = $scope.questions[elementPos];
      temp.selected = true;
      $scope.questions[elementPos] = temp;

    };

    $scope.addToMergeQuestion = function(questionAdd) {
      var elementPos = $scope.questionsMerge.map(function(x) {return x.id; }).indexOf(questionAdd.id);
      if(elementPos === -1) {
        $scope.questionsMerge.push(questionAdd);
      }
    };

    $scope.removeToMergeQuestion = function(questionRemove) {
      $scope.questionsMerge = $scope.questionsMerge.filter(item => item !== questionRemove);
    };

  });
