
angular.module('Public')
  .controller('FavoritesCtrl', function($scope, $rootScope, FavoritesService,  socketPublic ,$http , CONFIG, UserService) {

    $scope.show = false;

    // user info
    $scope.user = UserService.get();
    if($scope.list === undefined) {

      $scope.list = {favorites: [], questionsFavorites: []};

      $http.get(CONFIG.baseUrlApi + "/favorite/" + UserService.get().id)
        .then(function (response) {
          console.log('----------------------------');
          console.log(response.data[0]);
          console.log('----------------------------');
            for (var i = 0; i < response.data.length; i++) {
              $scope.list.favorites.push({favorites: {question_id: response.data[i].id, public_id: response.data[i].public_id}});
              response.data[i].created_at = new Date(response.data[i].created_at.replace(' ','T')).getTime()/1000;
              $scope.list.questionsFavorites.push({question: response.data[i]});
            }
        });
     /* $http.get(CONFIG.baseUrlApi + "/question/validInfo/" + UserService.get().id)
        .then(function (response) {

          console.log('----------------------------');
          // on met une propriété merge à la question main contenant l'array des questions mergées
          for (var i = 0; i < response.data.length; i++) {
            var quest = [];
            quest = response.data[i];
            quest.merge = response.data[i].merge;
            $scope.list.questionsFavorites.push({question: quest});
       //     $scope.list.questionsFavorites.splice(i, 1);

            console.log('----------------------------');
           // console.log($scope.list.questionsFavorites.question.merge);
          }


        });*/


    }


    /**
       * receprtions des reponses
     */
      // reception des reponses à des questions et des questions validées ou supprimées
    socketPublic.on('question', function (objResponse) {
      //console.log('reception dune reponse function');
      //console.log(objResponse);


      // on test si on a un int, sinon on parse la date
      if (objResponse.created_at !== parseInt(objResponse.created_at, 10)) {
        //console.log("on parse la date");
        objResponse.created_at = new Date(objResponse.created_at.replace(' ', 'T')).getTime() / 1000;
      }
      for(var i=0;i<$scope.list.questionsFavorites.length;i++){
        if ($scope.list.questionsFavorites[i].question.id === objResponse.questionid || $scope.list.questionsFavorites[i].question.questionid === objResponse.questionid) {
          $scope.list.questionsFavorites[i].question = objResponse;
          break;
        }
      }



    });



    // les votes
      socketPublic.on('vote', function (questionVoted) {

      for (var i = 0; i < $scope.list.questionsFavorites.length; i++) {
        if ($scope.list.questionsFavorites[i].question.id === questionVoted.questionid || $scope.list.questionsFavorites[i].question.questionid === questionVoted.questionid) {
          $scope.list.questionsFavorites[i].question.up_vote = questionVoted.up_vote;
        }
      }
    });

    socketPublic.on('favorite', function (msg) {


      var fav = {id: 0 , user: {} , question: {}};

      $http.get(CONFIG.baseUrlApi + '/favorite/newFavorite/' + msg.question_id)
        .then(function(response) {
          fav.question = response.data[0];

          $http.get(CONFIG.baseUrlApi + '/public/' + msg.public_id)
            .then(function(response) {
              fav.user = response.data[0];


            });
          var existed = false;
          for(var i = 0 ; i < $scope.list.favorites.length ; i++){
            if($scope.list.favorites[i].public_id === fav.user.id && ($scope.list.favorites[i].question_id === fav.question.id || $scope.list.favorites[i].question_id === fav.question.questionid)){
              existed = true;
            }
          }
          if(!existed){

            $scope.list.questionsFavorites.push({question: fav.question});
          }

      });

    });



    // reception des des questions merge
    socketPublic.on('merge', function (r) {


      var mainQuestion = {};
      mainQuestion = r.mainQuestion;
      //console.log(mainQuestion);

      var otherQuestions = [];
      otherQuestions = r.otherQuestions;
      //console.log(otherQuestions);

      // on met une propriété merge à la question main contenant l'array des questions mergées
      for (var i = 0; i < $scope.list.questionsFavorites.length; i++) {
        if ($scope.list.questionsFavorites[i].question.questionid === mainQuestion.id || $scope.list.questionsFavorites[i].question.questionid === mainQuestion.id) {
          $scope.list.questionsFavorites[i].question.merge = otherQuestions;

        }
      }

      // on supprime du fil normal les questions qui ont été mergée
      for (var i = 0; i < $scope.list.questionsFavorites.length; i++) {
        for (var j = 0; j < otherQuestions.length; j++) {
          if ($scope.list.questionsFavorites[i].question.questionid === otherQuestions[j].id || $scope.list.questionsFavorites[i].question.questionid === otherQuestions[j].id) {
           // $scope.list.questionsFavorites.splice(i, 1);
          }
        }
      }
    });
  });
