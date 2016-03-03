'use strict';

/**
 * @ngdoc directive
 * @name Moderator.directive:tweet
 * @description
 * # tweet
 */
angular.module('Moderator')
  .directive('tweet', function () {
    return {
      restrict: 'E',
      templateUrl: 'views/partials/_tweet.html'

    };
  });
