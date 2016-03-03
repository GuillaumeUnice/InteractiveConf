'use strict';

/**
 * Created by Romain on 09/12/2015.
 */

angular.module('Public')
  .controller('RedactCtrl', function ($scope, $http, CONFIG, $location, UserService, $rootScope) {


    $scope.questionResponseObj = [];

    // user info
    $scope.user = UserService.get();
    //console.log($scope.user);

    /** ============
     *  LES SOCKETS
     *  ============ */

    /**
     *  envoi de question
     */
    $scope.sendQuestionToMod = function () {

      //console.log("sendQuestionToMod");

      //console.log($scope.textcontent);
      //console.log($scope.numslide);
      //console.log(UserService.get().id);

      // status_code, question_id par defaut
      var question = {
        'content': $scope.textcontent,
        'public_id': UserService.get().id,
        'num_slide': $scope.numslide,
        'up_vote': 0,
        'created_at': new Date()/1000
      };

      $http.post(CONFIG.baseUrlApi + '/question/sendToModerator', question)
        .success(function (data) {
          //console.log('succes');
          //console.log(data);

          $rootScope.hasRedactedAQuestion = true;
          $location.path('/');      // TODO afficher une notification

        }).error(function (data) {
        //console.log('fail');
        //console.log(data);
      });
    };
  });
