'use strict';

/**
 * @ngdoc function
 * @name Public.controller:QuestionsCtrl
 * @description
 * # QuestionsCtrl
 * Controller of the Public
 */

  // TODO notification
  //$notification.info("TEST", "TEST....");
  //TODO question anonyme
  // TODO mise a jour coté public d'une modif du moderateur


angular.module('Public')
  .controller('QuestionsCtrl', function ($scope, $rootScope, $http, CONFIG, socketPublic, FavoritesService,
                                         QuestionsService, voteService, UserService, ngToast) {   // NotificationService

    // Initialization
    $scope.title = "Home";
    $scope.questionResponseObj = {};
    $scope.questionResponseArr = [];
    $scope.user = UserService.get();


    /**
     *  FILTRES
     */
    $scope.sortType = 'created_at';               // set the default sort type
    $scope.sortReverse = true;                    // set the default sort order
    $scope.show = false;


    /**
     *  USING RESOURCES & PROMISES
     */
    var questionsList = QuestionsService.get(function () {
      $scope.questionList = questionsList;
    });

    questionsList.$promise.then(function (data) {
      for (var i = 0; i < data.length; i++) {
        var objTmp = {}; // utile pour pas avoir un objet Response

        data[i].created_at = new Date(data[i].created_at.replace(' ', 'T')).getTime() / 1000;
        objTmp = data[i];
        if(data[i].status_code !== 15) {
          $scope.questionResponseObj[data[i].questionid] = objTmp;
        }
      }

      // obligé de faire ca pour pouvoir filtrer...
      for (var qr in $scope.questionResponseObj) {
        $scope.questionResponseArr.push($scope.questionResponseObj[qr]);
      }

      //console.log('----------------questionsList');
      //console.log($scope.questionResponseObj);
      //console.log($scope.questionResponseArr);
    });

    /**
     *  SOCKETS
     */

    // reception des reponses à des questions et des questions validées ou supprimées
    socketPublic.on('question', function (objResponse) {
      //console.log('reception dune reponse function');

      objResponse.questionid = objResponse.questionid || objResponse.id;

      //envoyer le questiion supprimée que à la personne concernée
      if(objResponse.status_code === 10 && objResponse.public_id !== UserService.get().id){

      }
      else
      {
        // on test si on a un int, sinon on parse la date
        if (objResponse.created_at !== parseInt(objResponse.created_at, 10)) {
          //console.log("on parse la date");
          objResponse.created_at = new Date(objResponse.created_at.replace(' ', 'T')).getTime() / 1000;
        }

        $scope.questionResponseObj[objResponse.questionid] = {};
        $scope.questionResponseObj[objResponse.questionid].responsecontent = objResponse.responsecontent;
        $scope.questionResponseObj[objResponse.questionid].status_code = objResponse.status_code;
        $scope.questionResponseObj[objResponse.questionid].up_vote = objResponse.up_vote;
        $scope.questionResponseObj[objResponse.questionid].created_at = objResponse.created_at;
        $scope.questionResponseObj[objResponse.questionid].content = objResponse.content;

        //obligé de faire ca pour pouvoir filtrer... #usine à gaz
        if ($scope.questionResponseArr.length === 0) {
          $scope.questionResponseArr.push(objResponse);
        }
        else {
          if (objResponse.public_id !== UserService.get().id && (objResponse.responsecontent === undefined || objResponse.responsecontent === null) ) {
            $scope.questionResponseArr.push(objResponse);
          }
          else {
            for (var i = 0; i < $scope.questionResponseArr.length; i++) {
              if ($scope.questionResponseArr[i].questionid === objResponse.questionid || $scope.questionResponseArr[i].id === objResponse.questionid) {
                $scope.questionResponseArr[i].responsecontent = objResponse.responsecontent;
                $scope.questionResponseArr[i].status_code = objResponse.status_code;
                $scope.questionResponseArr[i].up_vote = objResponse.up_vote;
                $scope.questionResponseArr[i].content = objResponse.content;
                $scope.questionResponseArr[i].created_at = objResponse.created_at;
              }
            }
          }
        }
      }


      //console.log('-------------------socket');
      //console.log($scope.questionResponseObj);
      //console.log($scope.questionResponseArr);

    });

    // les votes
    socketPublic.on('vote', function (questionVoted) {
      //console.log(questionVoted);
      questionVoted.questionid = questionVoted.questionid || questionVoted.id;

      $scope.questionResponseObj[questionVoted.id].up_vote = questionVoted.up_vote;
      for (var i = 0; i < $scope.questionResponseArr.length; i++) {
        if ($scope.questionResponseArr[i].questionid === questionVoted.questionid) {
          $scope.questionResponseArr[i].up_vote = questionVoted.up_vote;
        }
      }

    });



    // reception des des questions merge
    socketPublic.on('merge', function (r) {
      //console.log('---------------------> merge question');
      //console.log(r);

      var mainQuestion = {};
      mainQuestion = r.mainQuestion;
      //console.log(mainQuestion);

      var otherQuestions = [];
      otherQuestions = r.otherQuestions;
      //console.log(otherQuestions);

      // on met une propriété merge à la question main contenant l'array des questions mergées
      for(var i = 0; i < $scope.questionResponseArr.length; i++) {
        if($scope.questionResponseArr[i].questionid === mainQuestion.id) {
          $scope.questionResponseArr[i].merge = otherQuestions;
        }
        //if($scope.questionResponseArr[i].questionid === mainQuestion.id && $scope.questionResponseArr[i].merge.length !== 0) {
        //  for(var j = 0; j < $scope.questionResponseArr[i].merge[j].length; j++) {
        //    $scope.questionResponseArr[i].merge.push($scope.questionResponseArr[i].merge[j]);
        //  }
        //}
      }



      // on supprime du fil normal les questions qui ont été mergée
      for(var i = 0; i < $scope.questionResponseArr.length; i++) {
        for(var j = 0; j < otherQuestions.length; j++) {
          if($scope.questionResponseArr[i].questionid === otherQuestions[j].id) {
            $scope.questionResponseArr.splice(i, 1);
          }
        }
      }


      //for (var i = 0 ; i < r.otherQuestions.length ;i++) {
      //  $scope.questionResponseObj[r.otherQuestions[i].id] = {};
      //  $scope.questionResponseObj[r.otherQuestions[i].id] = r.otherQuestions[i];
      //}

      //for (var i = 0 ; i < $scope.questionResponseArr.length ;i++) {
      //  if( $scope.questionResponseArr[i].questionid === r.mainQuestion.id){
      //    $scope.questionResponseArr[i].content = r.mainQuestion;
      //    break;
      //  }
      //}
      //console.log($scope.questionResponseObj);
      //console.log($scope.questionResponseArr);

    });

  });


