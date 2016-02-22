'use strict';

/**
 * @ngdoc directive
 * @name Moderator.directive:signin
 * @description
 * # signin
 */
angular.module('Moderator')
  .directive('signin', function () {
    return {
      restrict: 'E',
      templateUrl: 'views/partials/_signin.html'

    };
  });
