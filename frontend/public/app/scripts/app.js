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
  'angularMoment',
  'ngToast'
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

  QUESTION_STATUS_CREATED: 0,
  QUESTION_STATUS_VALIDATED: 5,
  QUESTION_STATUS_DELETED: 10,
  QUESTION_STATUS_MERGED: 15,
  QUESTION_STATUS_ANSWERED: 20,
  QUESTION_STATUS_SENT: 25,
  QUESTION_STATUS_DISPLAYED: 30,

  cookieName: 'conf_user'
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
    .when('/redact', {
      templateUrl: 'views/redact.html',
      controller: 'RedactCtrl',
      controllerAs: 'redact'
    })
    .when('/login', {
      templateUrl: 'views/login.html',
      controller: 'LoginCtrl',
      controllerAs: 'login'
    })
    .otherwise({
      redirectTo: '/'
    });
})
.run(function ($rootScope, $location, $log, $route, $window, UserService, ngToast){
  //$log.debug('In run function');

  $rootScope.$on( "$routeChangeStart", function(/*event, next, current*/) {
    if (UserService.get() === undefined && $location.path() !== '/login') {
      //$log.debug('not logged. redirection...');
      $location.path("/login");
    }
    else if (UserService.get() !== undefined && $location.path() === '/login') {
      //$log.debug('logged. redirection...');
      $location.path("/");
    }

    $rootScope.isLogged = UserService.get() !== undefined;

    if($rootScope.hasRedactedAQuestion) {
      // Notif
      ngToast.create('<span class="text-center">Bien envoyée.<br/>' +
                     'Ajoutée aux favoris.</span>');
      $rootScope.hasRedactedAQuestion = false;
    }

  });

});
