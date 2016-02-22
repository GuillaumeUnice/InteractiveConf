'use strict';


/**
 * @ngdoc service
 * @name chairmanApp.socketQuestion
 * @description
 * # socketQuestion is a factory which contains all about initialisation and event to receive question by socket
 */
angular.module('chairmanApp')
  .factory('socketQuestion', function (CONFIG, socketFactory, $rootScope) {

    var socket = null;

    return {

    socket: socket,

    init: function(token){

      var backendIOSocket = io(CONFIG.ioBaseUrl + '/chairman',
      {
        'path' : CONFIG.ioPath + '/socket.io',
        'reconnection': true,
        'reconnectionAttempts': 10,
        'reconnectionDelay': 1000,
        'reconnectionDelayMax': 5000,
        'timeout': 5000,
        'autoConnect': true,
        'multiplex': false,
        'query': 'token=' + token //'eyJhbGciOiJIUzI1NiJ9.RGlsbG9u.2dxiEVLiZ1frU_qm05kU0XRnB88QG5nhPFeFNuY2vKc',
      });

      backendIOSocket.on("connect", function () {
        console.log('on est connecté!!!!');
      });

      backendIOSocket.on("error", function (errorData) {
        console.error("An error occurred during connection to Backend.");
        console.log(errorData);
      });

      backendIOSocket.on("disconnect", function () {
        console.info("Disconnected to Backend.");
      });

      backendIOSocket.on("reconnect", function (attemptNumber) {
        console.info("Connected to Backend after " + attemptNumber + " attempts.");
      });

      backendIOSocket.on("reconnect_attempt", function () {
        $rootScope.$broadcast('reconnectSocket');
        console.info("Trying to reconnect to Backend.");
      });

      backendIOSocket.on("reconnecting", function (attemptNumber) {
        console.info("Trying to connect to Backend - Attempt number " + attemptNumber + ".");
      });

      backendIOSocket.on("reconnect_error", function (errorData) {
        console.error("An error occurred during reconnection to Backend.");
        console.log(errorData);
      });

      backendIOSocket.on("reconnect_failed", function () {
        console.error("Failed to connect to Backend. New attempt will be done in 5 seconds. Administrators received an Alert !");
      });

      socket = socketFactory({
          ioSocket: backendIOSocket
      });
    },

    on : function(eventName, callback) {
      socket.on(eventName, function () {
          var args = arguments;
          //$rootScope.$apply(function () {
              callback.apply(socket, args);
          //});
      });
    }
  };

});
