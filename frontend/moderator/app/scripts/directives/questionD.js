'use strict';

/**
 * @ngdoc directive
 * @name Moderator.directive:question
 * @description
 * # question
 */
angular.module('Moderator')
  .directive('question', function () {
    return {
      restrict: 'E',
      templateUrl: 'views/partials/_question.html'

    };
  });
