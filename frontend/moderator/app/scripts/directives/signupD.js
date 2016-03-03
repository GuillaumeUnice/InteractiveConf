'use strict';

/**
 * @ngdoc directive
 * @name Moderator.directive:signup
 * @description
 * # signup
 */
angular.module('Moderator')
  .directive('signup', function () {
    return {
      restrict: 'E',
      templateUrl: 'views/partials/_signup.html'

    };
  });
