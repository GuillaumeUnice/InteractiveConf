'use strict';

/**
 * @ngdoc overview
 * @name Moderator
 * @description
 * # Moderator
 *
 * Main module of the application.
 */
angular
  .module('Moderator', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.sortable',
    'btford.socket-io',
    'notifications',
    'xeditable'
  ])
  .constant('CONFIG', {
      baseUrl: 'http://localhost:3010',
      baseUrlApi: 'http://localhost:3010/api',
      baseUrlQuestion: 'http://localhost:3010/api/question',
    /*baseUrl: 'http://sparks-vm19.i3s.unice.fr:80/pfe',
    baseUrlApi: 'http://sparks-vm19.i3s.unice.fr:80/pfe/api',
    baseUrlQuestion: 'http://sparks-vm19.i3s.unice.fr:80/pfe/api/question',*/
     ioBaseUrl: 'http://localhost:3010',
     ioPath: '',
   /* ioBaseUrl: 'http://sparks-vm19.i3s.unice.fr:80',
    ioPath: '/pfe',*/

      JSON_STATUS_SUCCESS: 1,
      JSON_STATUS_WARNING: -1,
      JSON_STATUS_NOTICE: 0,
      JSON_STATUS_ERROR: -2,

      QUESTION_STATUS_CREATED: 0,
      QUESTION_STATUS_VALIDATED: 5,
      QUESTION_STATUS_DELETED: 10,
      QUESTION_STATUS_MERGED: 15,
      QUESTION_STATUS_ANSWERED: 20,
      QUESTION_STATUS_SENT: 25,
      QUESTION_STATUS_DISPLAYED: 30,

  })
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/auth', {
        templateUrl: 'views/auth.html',
        controller: 'MainCtrl',
        controllerAs: 'auth'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
/*
var fenixApp = angular.module('Moderator', ['ngRoute']);

fenixApp.factory('mysocket', ['$rootScope', function ($rootScope) {
    console.log("factory");
    var socket = io.connect('http://localhost:3016');
    console.log("socket created");

    return {
        on: function (eventName, callback) {
            function wrapper() {
                var args = arguments;
                $rootScope.$apply(function () {
                    callback.apply(socket, args);
                });
            }

            socket.on(eventName, wrapper);

            return function () {
                socket.removeListener(eventName, wrapper);
            };
        },

        emit: function (eventName, data, callback) {
            socket.emit(eventName, data, function () {
                var args = arguments;
                $rootScope.$apply(function () {
                    if(callback) {
                        callback.apply(socket, args);
                    }
                });
            });
        }
    };
}]);

fenixApp.config(['$routeProvider', function($routeProvider){
  $routeProvider
      //route for home page
      .when('/', {
          templateUrl : '/',
          controller : 'mainController'
      })
      .otherwise({
        redirectTo: '/'
      });
}]);

fenixApp.controller('mainController', function($scope, mysocket) {
    $scope.recievedTroughSocket = "still waiting for data...";
    $scope.sendWithSocket = function(msg){
        mysocket.emit("something", msg);
    }
    mysocket.on("greetings", function(data){
        console.log("user data: " + JSON.stringify(data));
        $scope.recievedTroughSocket = data.msg;
    });
});*/
