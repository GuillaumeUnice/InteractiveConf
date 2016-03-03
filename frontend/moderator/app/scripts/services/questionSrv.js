'use strict';

/**
 * @ngdoc service
 * @name Moderator.question
 * @description
 * # question
 * Factory in the Moderator.
 */
angular.module('Moderator')
  .factory('question', function ($http, notification, $rootScope, $q, CONFIG) {
    // Service logic
    // ...

    return {
      removeQuestion: function (questionToRemove , idQuestion) {
        var newQ = {
          id: 0,
          content: "",
          status_code: 0,
          public_id: 0,
          num_slide: 0,
          up_vote: 0,
          created_at: ""
        };
        if(questionToRemove.content !== undefined && questionToRemove.status_code === 10){
          newQ.content = questionToRemove.content;
          newQ.status_code = questionToRemove.status_code;
          if(questionToRemove.id !== undefined){newQ.id = questionToRemove.id}
          if(questionToRemove.public_id !== undefined){newQ.public_id = questionToRemove.public_id}
          if(questionToRemove.num_slide !== undefined){newQ.num_slide = questionToRemove.num_slide}
          if(questionToRemove.up_vote !== undefined){newQ.up_vote  = questionToRemove.up_vote }
          if(questionToRemove.created_at !== undefined){newQ.created_at  = questionToRemove.created_at ;}
        }
         var deferred = $q.defer();
        $http.put(CONFIG.baseUrlApi + '/question/sendToPublic/'+idQuestion, newQ)
          .success(function(data) {
            notification.writeNotification(data);
            deferred.resolve(data);
          }).error(function(data) {
            notification.writeNotification(data);
            deferred.reject(false);
          });
        return deferred.promise;
      },

     validateQuestion: function (questionToSend, idQuestion) {

       // console.log("questionToSend : ");
       // console.log(questionToSend);

       // console.log("Id question : " + idQuestion + "public_id : ");
       // console.log(questionToSend.public_id);

       var deferred = $q.defer();
       var newQ = {
         id: 0,
         content: "",
         status_code: 0,
         public_id: 0,
         num_slide: 0,
         up_vote: 0,
         created_at: "",
         prenom: "",
         nom: ""
       };
       if(questionToSend.content !== undefined && questionToSend.status_code === 5){
         newQ.content = questionToSend.content;
         newQ.status_code = questionToSend.status_code;
         if(questionToSend.id !== undefined){newQ.id = questionToSend.id}
         if(questionToSend.public_id !== undefined){newQ.public_id = questionToSend.public_id}
         if(questionToSend.num_slide !== undefined){newQ.num_slide = questionToSend.num_slide}
         if(questionToSend.up_vote !== undefined){newQ.up_vote  = questionToSend.up_vote }
         if(questionToSend.created_at !== undefined){newQ.created_at  = questionToSend.created_at }
         if(questionToSend.prenom !== undefined){newQ.prenom  = questionToSend.prenom }
         if(questionToSend.nom !== undefined){newQ.nom  = questionToSend.nom }
       }

       // console.log("idQuestion: " + idQuestion);
       // console.log("newQ : ");
       // console.log(newQ);

      $http.put(CONFIG.baseUrlApi + '/question/sendToChairman/'+idQuestion, newQ)
        .success(function(data) {
         notification.writeNotification(data);
          deferred.resolve(data);
        }).error(function(data) {
        notification.writeNotification(data);
          deferred.reject(false);
        });
      return deferred.promise;
    }
    };
  });
