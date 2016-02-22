'use strict';

/**
 * @ngdoc overview
 * @name Public
 * @description
 * # Public
 *
 * Main module of the application.
 */
angular
  .module('Public', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.sortable',
    'btford.socket-io',
    'notifications',
    'angularMoment'
  ])
  .constant('CONFIG', {
     baseUrl: 'http://localhost:3010',
     baseUrlApi: 'http://localhost:3010/api',
     baseUrlQuestion: 'http://localhost:3010/api/question',
     //baseUrl: 'http://sparks-vm19.i3s.unice.fr:80/pfe',
     //baseUrlApi: 'http://sparks-vm19.i3s.unice.fr:80/pfe/api',
     //baseUrlQuestion: 'http://sparks-vm19.i3s.unice.fr:80/pfe/api/question',

     ioBaseUrl: 'http://localhost:3010',
     ioPath: '',
     //ioBaseUrl: 'http://sparks-vm19.i3s.unice.fr:80',
     //ioPath: '/pfe',
  })
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/wall-question-answer.html',
        controller: 'QuestionsCtrl',
        controllerAs: 'questions'
      })
      .when('/favorites', {
        templateUrl: 'views/favorites.html',
        controller: 'FavoritesCtrl',
        controllerAs: 'favorites'
      })
      .when('/sendquestion', {
        templateUrl: 'views/redact.html',
        controller: 'SendquestionCtrl',
        controllerAs: 'sendquestion'
      })
      .otherwise({
        redirectTo: '/'
      });
  });

