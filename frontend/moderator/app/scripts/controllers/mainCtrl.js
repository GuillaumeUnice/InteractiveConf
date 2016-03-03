'use strict';
//var backendIOSocket = "";
/**
 * @ngdoc function
 * @name Moderator:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the Moderator
 */
var app = angular.module('Moderator');


app.run(function (editableOptions) {
  editableOptions.theme = 'bs3';
});


app.controller('MainCtrl', function ($scope, $http, $cookies, $location, socketModerator, notification, tweet, question, inscription, CONFIG) {

  /**
   * INITIALIZATIONS
   */
  $scope.tweets = [];
  $scope.logged = false;
  $scope.created = true;
  $scope.newQuestion = {};

  $scope.events = {
    questions: [],
    user: {}
  };


  // test de connexion
 /* $scope.user = $cookies.getObject('user');
  console.log($scope.user);
  if ($scope.user === undefined) {
    $location.path('/login');
  }*/

  $scope.date = new Date();
  // retrieve data from data base
  $http.get(CONFIG.baseUrlApi + "/question/toModerator/" + CONFIG.QUESTION_STATUS_CREATED)
    .then(function (response) {
      for (var i = 0; i < response.data.length; i++) {
        // convert Date
        response.data[i].created_at = new Date(response.data[i].created_at.replace(' ', 'T')).getTime() / 1000;
        $scope.events.questions.push(response.data[i]);
      }
    });


  /**
   * SOCKET
   */


  socketModerator.init();

  // add a new question from public
  $scope.addQuestion = function (event) {
    $scope.events.questions.push(event);
    $scope.event = '';
  };

  // add a new tweet
  $scope.addTweet = function () {

    // if it is a retweet
    if (tweet.retweeted_status) {
    }
    // if it is a reply
    else if (isset($data['in_reply_to_status_id_str'])) {
    }
    // if it is a mention
    else if (isset($data['in_reply_to_user_id_str'])) {
    }
    // if it is an original tweet
    else {
      $scope.tweets.push($scope.tweet);
      $scope.tweet = '';
    }
  };


  //listened for a new question
  socketModerator.on("question", function (msg) {
    console.log("question validated: " + msg);
  });

  //listened for a new tweet & mise a jour de la view
  socketModerator.on("tweet", function (msg) {
    $scope.tweets.push(msg);
    $scope.$apply();
  });

  socketModerator.on("questionFromPublic", function (msg) {

    $scope.event = {
      id: 0,
      content: "",
      status_code: 0,
      public_id: 0,
      num_slide: 0,
      up_vote: 0,
      created_at: "",
      nom: "",
      prenom: ""
    };
    $http.get(CONFIG.baseUrlApi + "/public/" + msg.public_id)
      .then(function (response) {
        if (response.data.length > 0) {
          $scope.nom = response.data[0].nom;
          $scope.prenom = response.data[0].prenom;
        }
        else {
          $scope.prenom = response.data.prenom;
          $scope.nom = response.data.nom;
        }

        $http.get(CONFIG.baseUrlApi + "/question/" + msg.id)
          .then(function (response) {

            if (response.data.length > 0) {
              $scope.event.id = response.data[0].id;
              $scope.event.content = response.data[0].content;
              $scope.event.status_code = response.data[0].status_code;
              $scope.event.public_id = response.data[0].public_id;
              $scope.event.num_slide = response.data[0].num_slide;
              if(response.data[0].up_vote===0){$scope.event.up_vote = response.data[0].up_vote++;}
              else{$scope.event.up_vote = response.data[0].up_vote;}
              $scope.event.nom = $scope.nom;
              $scope.event.prenom = $scope.prenom;
              // convert Date
              $scope.event.created_at = new Date(response.data[0].created_at.replace(' ', 'T')).getTime() / 1000;
            }
            else {
              $scope.event.id = response.data.id;
              $scope.event.content = response.data.content;
              $scope.event.status_code = response.data.status_code;
              $scope.event.public_id = response.data.public_id;
              $scope.event.num_slide = response.data.num_slide;
              $scope.event.up_vote = response.data.up_vote;
              $scope.event.nom = $scope.nom;
              $scope.event.prenom = $scope.prenom;
              // convert Date
              $scope.event.created_at = new Date(response.data.created_at.replace(' ', 'T')).getTime() / 1000;
            }

            $scope.addQuestion($scope.event);
            var json = {
              title: "question",
              message: "new question",
              status: 100
            };
            notification.writeNotification(json);

          });
        /*
         $scope.addQuestion($scope.event);
         var json = {
         title : "question",
         message : "new question",
         status : 100
         };
         notification.writeNotification(json);*/

      });
  });


  $scope.getUserName = function (id) {
    var res = {};
    $http.get(CONFIG.baseUrlApi + "/public/" + id)
      .then(function (response) {
        res = response.data;
      });
    return res;
  };

  // remove question and send a message to public
  $scope.removeQuestion = function (index) {
    $scope.events.questions[index].status_code = 10;
    question.removeQuestion($scope.events.questions[index], $scope.events.questions[index].id);
    $scope.events.questions.splice(index, 1);
  };

  // remove tweet
  $scope.removeTweet = function (index) {
    $scope.tweets.splice(index, 1);
  };

  // update a question before sending to chairman
  $scope.editQuestion = function (event, index) {
    $scope.events.questions[index] = event;
  };

  // send question if valitdated to chairman and store it in Data Base
  $scope.validateQuestion = function (index) {
    $scope.events.questions[index].status_code = 5;
    question.validateQuestion($scope.events.questions[index], $scope.events.questions[index].id);
    $scope.events.questions.splice(index, 1);
  };

  //send question if valitdate to screen (tweet wall)
  $scope.sendToScreen = function (index) {
    tweet.validateTweet($scope.tweets[index]);
    $scope.removeTweet(index);
  };


  /**
   une manière d'encrypter les données du user : nom , mot de passe , email ......
   Lien vers la personne à qui j'ai piqué le code :) : http://spaghetti.io/cont/article/angularjs-and-basic-auth/12/1.html#.VpaxtFnb_HY
   "il est open source"
   **/
  $scope._base64 = {
    _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
    encode: function (e) {
      var t = "";
      var n, r, i, s, o, u, a;
      var f = 0;
      e = $scope._base64._utf8_encode(e);
      while (f < e.length) {
        n = e.charCodeAt(f++);
        r = e.charCodeAt(f++);
        i = e.charCodeAt(f++);
        s = n >> 2;
        o = (n & 3) << 4 | r >> 4;
        u = (r & 15) << 2 | i >> 6;
        a = i & 63;
        if (isNaN(r)) {
          u = a = 64
        } else if (isNaN(i)) {
          a = 64
        }
        t = t + this._keyStr.charAt(s) + this._keyStr.charAt(o) + this._keyStr.charAt(u) + this._keyStr.charAt(a)
      }
      return t
    },
    decode: function (e) {
      var t = "";
      var n, r, i;
      var s, o, u, a;
      var f = 0;
      e = e.replace(/[^A-Za-z0-9+/=]/g, "");
      while (f < e.length) {
        s = this._keyStr.indexOf(e.charAt(f++));
        o = this._keyStr.indexOf(e.charAt(f++));
        u = this._keyStr.indexOf(e.charAt(f++));
        a = this._keyStr.indexOf(e.charAt(f++));
        n = s << 2 | o >> 4;
        r = (o & 15) << 4 | u >> 2;
        i = (u & 3) << 6 | a;
        t = t + String.fromCharCode(n);
        if (u != 64) {
          t = t + String.fromCharCode(r)
        }
        if (a != 64) {
          t = t + String.fromCharCode(i)
        }
      }
      t = $scope._base64._utf8_decode(t);
      return t
    },
    _utf8_encode: function (e) {
      e = e.replace(/rn/g, "n");
      var t = "";
      for (var n = 0; n < e.length; n++) {
        var r = e.charCodeAt(n);
        if (r < 128) {
          t += String.fromCharCode(r)
        } else if (r > 127 && r < 2048) {
          t += String.fromCharCode(r >> 6 | 192);
          t += String.fromCharCode(r & 63 | 128)
        } else {
          t += String.fromCharCode(r >> 12 | 224);
          t += String.fromCharCode(r >> 6 & 63 | 128);
          t += String.fromCharCode(r & 63 | 128)
        }
      }
      return t
    },
    _utf8_decode: function (e) {
      var t = "";
      var n = 0;
      var r = 0, c1 = 0, c2 = 0, c3 = 0;
      while (n < e.length) {
        r = e.charCodeAt(n);
        if (r < 128) {
          t += String.fromCharCode(r);
          n++
        } else if (r > 191 && r < 224) {
          c2 = e.charCodeAt(n + 1);
          t += String.fromCharCode((r & 31) << 6 | c2 & 63);
          n += 2
        } else {
          c2 = e.charCodeAt(n + 1);
          c3 = e.charCodeAt(n + 2);
          t += String.fromCharCode((r & 15) << 12 | (c2 & 63) << 6 | c3 & 63);
          n += 3
        }
      }
      return t
    }
  };


});
