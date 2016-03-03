'use strict';

/**
 * @ngdoc function
 * @name Public.controller:VotesctrlCtrl
 * @description
 * # VotesctrlCtrl
 * Controller of the Public
 */
angular.module('Public')
  .controller('VotesCtrl', function ($scope, $http,UserService,FavoritesService,voteService,CONFIG) {


    $scope.updateVote = function (question) {

      var fav = {question_id: question.questionid, public_id: UserService.get().id};
      var voted = false;
      //console.log("#################");
      //console.log(question);
      //console.log("#################");
      $http.get(CONFIG.baseUrlApi + '/favorite/')
        .then(function (response) {
          if (UserService.get().id !== question.public_id) {
            for (var i = 0; i < response.data.length; i++) {
              if (UserService.get().id === response.data[i].public_id && response.data[i].question_id === question.questionid) {
                voted = true;
                break;
              }
            }


            if (!voted) {
              $http.get(CONFIG.baseUrlApi + '/question/' + question.questionid)
                .then(function (response) {

                  question.up_vote++;

                  var tempQ = {
                    id: 0,
                    content: "",
                    status_code: 0,
                    public_id: 0,
                    num_slide: 0,
                    up_vote: 0,
                    created_at: ""
                  };
                  if (question.content !== undefined && question.status_code === 5) {
                    tempQ.content = question.content;
                    tempQ.status_code = question.status_code;
                    if (question.questionid !== undefined) {
                      tempQ.id = question.questionid
                    }
                    if (question.public_id !== undefined) {
                      tempQ.public_id = question.public_id
                    }
                    if (question.num_slide !== undefined) {
                      tempQ.num_slide = question.num_slide
                    }
                    if (question.up_vote !== undefined) {
                      tempQ.up_vote = question.up_vote
                    }
                    if (question.created_at !== undefined) {
                      tempQ.created_at = question.created_at;
                    }
                  }
                  response.data[0].up_vote++;
                  // response.data[0].created_at = new Date(response.data[0].created_at.replace(' ', 'T')).getTime() / 1000;
                  voteService.sendVote(response.data[0]);
                  FavoritesService.addToFavorites(fav);
                })
            }
          }
        });
    }
  });
