'use strict';

/**
 * @ngdoc service
 * @name Public.vote
 * @description
 * # vote
 * Service in the Public.
 */
angular.module('Public')
  .service('voteService', function ($http , $q , CONFIG) {
    // AngularJS will instantiate a singleton by calling "new" on this function

    return {
      sendVote: function(question){
        var deferred = $q.defer();
        $http.put(CONFIG.baseUrlApi + '/question/sendToChairmanVote/'+question.id, question)
          .success(function (data) {

            return deferred.resolve(data)

          }).error(function (data){

          deferred.reject(false);
        });
        return deferred.promise
      }
    }
  });
