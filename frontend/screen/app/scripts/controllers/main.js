'use strict';

/**
 * @ngdoc function
 * @name screen.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the application
 */
angular.module('screen')
  .controller('MainCtrl', function MainCtrl($scope, backendSocket) 
  {
    $scope.events = [];
    $scope.question = {};
    $scope.question.isDisplayed = false;
    // $scope.mockQuestion = {};
    // $scope.mockQuestion.id = 1;
    // $scope.mockQuestion.name = "jean Marc";
    // $scope.mockQuestion.content = "Quel est la question ?";
    
    backendSocket.on('tweet', function(tweet){
      // console.log(tweet);
      tweet.isTweet = true;
      tweet.isFocused = false;
      tweet.receivedAt = Date.now();

      // if it is a retweet        
      if (tweet.retweeted_status)
      {
        // TODO
      }
      /*
      // if it is a reply
      else if (isset($data['in_reply_to_status_id_str']))
      {
           //TODO
      }
      // if it is a mention
      else if (isset($data['in_reply_to_user_id_str']))
      {
           //TODO
      }
      */
      // if it is an original tweet
      else
      {
        // console.log(tweet);
        // mise a jour de la view
        $scope.events.push(tweet);
        $scope.$apply();
      }

    });


    // $scope.focustweet = function focustweet(id){
    backendSocket.on('focustweet', function(id){
      // console.log('focustweet');
      // var cpt = 0;
      // var gnar = $scope.events.length-2;
      $scope.events.forEach(function(tweet) {
        if (tweet.id === id) { // || cpt === gnar) {
          tweet.isFocused = true;
          // console.log('THE FOCUS');
        } else {
          tweet.isFocused = false;
        }
        //cpt++;
      });

    });
    // };

    // $scope.newquestion = function newquestion(id, name, content){
    backendSocket.on('question', function(newQuestion){
      // console.log('newquestion');
      // console.log(newQuestion);
      $scope.question.id = newQuestion.id;
      $scope.question.name = ""; // question.public_id;  aller le chercher en bdd
      $scope.question.content = newQuestion.content;
      $scope.question.num_slide = (newQuestion.num_slide) ? "Slide n°" + newQuestion.num_slide : "";
      $scope.question.isDisplayed = true;
      // console.log($scope.question);
    });
    // };

    // $scope.hidequestion = function hidequestion(){
    backendSocket.on('hidequestion', function(){
      // console.log('hidequestion');
      $scope.question.isDisplayed = false;
    });
    // };


  });
