'use strict';

/**
 * @ngdoc directive
 * @name Moderator.directive:parseData
 * @description
 * # parseData
 */
angular.module('Moderator')
  .directive('parseData', function () {
    return {
    restrict: 'E',
    link: function(scope , $element , attrs){
      console.log(scope);
      console.log($element + attrs);
    }
  };
  });
