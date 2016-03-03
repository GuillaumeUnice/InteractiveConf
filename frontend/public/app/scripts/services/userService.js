'use strict';

/**
 * @ngdoc service
 * @name Public.UserService
 * @description
 * # UserService
 * Service in the Public.
 */

angular.module('Public')
.factory('UserService', function ($cookies, $location, CONFIG) {

  var cookieName = CONFIG.cookieName;

  var get = function() {
    return $cookies.getObject(cookieName);
  };

  var set = function(newUser) {
    $cookies.putObject(cookieName, newUser);
  };

  var clear = function() {
    $cookies.remove(cookieName);
    $location.path("/login");
  };

  return {
    get: get,
    set: set,
    clear: clear
  };
});