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
  .controller('QuestionsCtrl', function ($scope, $http, CONFIG, socketPublic,
                                         QuestionsService, UsersService, ResponsesService, voteService
                                         /*,$notification*/) {

    // titre du bloc info header
    $scope.title = "Home";

    // contient question et response de la forme : {"question":{}, "response":{"content":"..."}}
    $scope.Map = {};

    // contient la copie de la map, de sorte à pouvoir filtrer dessus
    $scope.qrArray = [];

    // affichage reponse
    $scope.show = false;

    // les filtres
    $scope.sortType     = 'question.created_at';   // set the default sort type
    $scope.sortReverse  = false;                  // set the default sort order


    /** ====================
     *       RESOURCES
     *  ==================== */
    var questionsList = QuestionsService.get(function () {
      $scope.questionList = questionsList;
    });

    var responsesList = ResponsesService.get(function () {
      $scope.responsesList = responsesList;
    });

    var usersList = UsersService.get(function () {
      $scope.usersList = usersList;
    });

    /** ====================
     *     USING PROMISES
     *  ==================== */
      // stockage dans la Map des questions presentes dans la BD
    questionsList.$promise.then(function (data) {
      for (var i = 0; i < data.length; i++) {
        var objTmp = {};
        //console.log(data[i]);
        objTmp.question = data[i];
        objTmp.response = {};
        $scope.Map[data[i].id] = objTmp;
      }
    });

    // stockage dans la Map des reponses presentes dans la BD
    responsesList.$promise.then(function (data) {
      for (var i = 0; i < data.length; i++) {
        var key = data[i].question_id;
        if ($scope.Map.hasOwnProperty(key)) {
          $scope.Map[key].response = {"content": data[i].content};
        }
      }

      // on ajoute tout à un tableau sur lequel il sera possible de filtrer
      for(var qr in $scope.Map) {
        $scope.qrArray.push($scope.Map[qr]);
      }

      console.log($scope.qrArray);
    });



    /** ==================
     *     THE SOCKETS
     *  ================== */

    // reception des reponse à des questions
    socketPublic.on('question', function (r) {
      console.log("NOUVELLE REPONSE DU CHAIRMAN");
      //console.log(JSON.stringify(questionAndResponse));
      //console.log('ID question : ' + questionAndResponse.question.id + '\nReponse : ' + questionAndResponse.response);
      $scope.Map[r.question.id].response = {"content": r.response};
    });

    // reception des reponse à des questions d'autres utilisateurs
    // TODO remplacer pour recevoir les questions quand elles ont été validées par le moderateur ou chairman
    socketPublic.on('questionFromPublicToPublic', function (question) {
      console.log("NOUVELLE QUESTION DU PUBLIC");
      console.log(question);

      var objTmp = {};
      objTmp.question = question;
      objTmp.response = {};
      $scope.Map[question.id] = objTmp;

      // pour les filtres on ajoute à un tableau
      $scope.qrArray.push($scope.Map[question.id]);
    });

    /**
     * method to update vote
     */
    $scope.updateVote = function(question){
      voteService.sendVote(question);
      console.log("---- > ");
      console.log(question);
    };


  });


