var sio = require("socket.io");
var socketioJwt = require('socketio-jwt');
var constants = require('../our_modules/constants');

/**
* 
*/
function Socket (httpServer) {

  this.mySocket = sio(httpServer);
  this.namespaceManager = [];
  /*
  this.mySocket.set('authorization', socketioJwt.authorize({
    secret: constants.JWT_SECRET,
    handshake: true
  }));
  //*/
  this.addNamespace = function(namespace) {
    var newNamespace = this.mySocket.of("/" + namespace);
    this.namespaceManager[namespace] = newNamespace;
    console.log(namespace + "........... connection ...........");
    this.connection(namespace);
  };


  this.connection = function(namespace) {

    this.namespaceManager[namespace].on('connection', function(socket) {
      //console.log(socket.handshake.decoded_token.pseudo, 'connected');
      console.log("New Client Connection for namespace '" + namespace + "' : " + socket.id);

      socket.on('disconnect', function(){
        console.log("Client disconnected for namespace '" + namespace + "' : " + socket.id);
      });

      socket.on('error', function(errorData){
        console.log("An error occurred during Client connection for namespace '" + namespace + "' : " + socket.id);
        console.log(errorData);
      });

      socket.on('reconnect', function(attemptNumber){
        console.log("Client Connection for namespace '" + namespace + "' : " + socket.id + " after " + attemptNumber + " attempts.");
      });

      socket.on('reconnect_attempt', function(){
        console.log("Client reconnect attempt for namespace '" + namespace + "' : " + socket.id);
      });

      socket.on('reconnecting', function(attemptNumber){
        console.log("Client Reconnection for namespace '" + namespace + "' : " + socket.id + " - Attempt number " + attemptNumber);
      });

      socket.on('reconnect_error', function(errorData){
        console.log("An error occurred during Client reconnection for namespace '" + namespace + "' : " + socket.id);
        console.log(errorData);
      });

      socket.on('reconnect_failed', function(){
        console.log("Failed to reconnect Client for namespace '" + namespace + "' : " + socket.id + ". No new attempt will be done.");
      });

    });

  };

  this.sendByNamespace = function(namespace, resource, data) {
    this.namespaceManager[namespace].emit(resource, data);
  };

  this.sendBySocketId = function(socketId, resource, data) {
    this.namespaceManager[socketId].emit(resource, data);
  };

  /**
   * Search NamespaceManager corresponding to socket's id in param.
   *
   * @method retrieveNamespaceManagerFromSocketId
   * @param {string} socketId - The socket's id attached to NamespaceManager
   * @returns null if not found, NamespaceManager if found
   */
  this.retrieveNamespaceManagerFromSocketId = function(socketId) {
    console.log("Server - retrieveNamespaceManagerFromSocketId");
    console.log(this.namespaceManagers);
    console.log(socketId);
    if(typeof(this.namespaceManagers[socketId]) == "undefined") {
      return null;
    } else {
      return this.namespaceManagers[socketId];
    }
  };

};

exports.Socket = Socket;
