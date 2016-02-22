'use strict';

/**
 * Created by Romain on 09/12/2015.
 */

angular.module('Public')
  .controller('SendquestionCtrl', function ($scope, $http, CONFIG, $location) {


    $scope.questionResponseArray = [];

    /** ============
     *  LES SOCKETS
     *  ============ */

    /**
     *  envoi de question
     */
    $scope.sendQuestionToMod = function () {

      console.log($scope.textcontent);
      console.log($scope.numslide);

      // status_code, question_id par defaut
      var question = {
        "content": $scope.textcontent,
        "public_id": 1,
        "num_slide": $scope.numslide,
        "up_vote": 0,
        "created_at": new Date()/1000
      };

      $http.post(CONFIG.baseUrlApi + '/question/sendToModerator', question)
        .success(function (data) {
          console.log('succes');
          console.log(data);
          $location.path('/');      // TODO afficher une notification

        }).error(function (data) {
        console.log('fail');
        console.log(data);
      });
    };
  });
