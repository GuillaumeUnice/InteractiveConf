'use strict';

/**
 * @ngdoc overview
 * @name speaker
 * @description
 * # speaker
 *
 * Main module of the application.
 */
angular
  .module('speaker', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.sortable',
    'ui.bootstrap',
    'timer',
    'btford.socket-io'
  ])
  .constant('CONFIG', {
    // baseUrl: 'http://localhost:3010',
    // baseUrlApi: 'http://localhost:3010/api',
    // baseUrlQuestion: 'http://localhost:3010/api/question',
    baseUrl: 'http://sparks-vm19.i3s.unice.fr:80/pfe',
    baseUrlApi: 'http://sparks-vm19.i3s.unice.fr:80/pfe/api',
    baseUrlQuestion: 'http://sparks-vm19.i3s.unice.fr:80/pfe/api/question',
    
    // ioBaseUrl: 'http://localhost:3010',
    // ioPath: '',
    ioBaseUrl: 'http://sparks-vm19.i3s.unice.fr:80',
    ioPath: '/pfe',

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
      .otherwise({
        redirectTo: '/'
      });
  });
