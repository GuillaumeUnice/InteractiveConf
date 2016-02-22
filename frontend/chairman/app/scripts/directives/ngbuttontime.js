'use strict';

/**
 * @ngdoc directive
 * @name chairmanApp.directive:ngButtonTime
 * @description
 * # ngButtonTime
 */
angular.module('chairmanApp')
  .directive('ngButtonTime', function () {
    return {
      template: '<div  id="ngButtonTime" class="col-sm-4 col-md-2 col-lg-2 tab"><span><i class="glyphicon glyphicon-time"></i> {{ text }}</span></div>',
      restrict: 'E',
            transclude: true,
      scope: {
        text: '@'
      },
      link: function postLink(scope, element) {
        element.on('click', function() {
        	angular.element('#ngButtonTime > span').addClass('btn-shake');
          setTimeout( function() { angular.element('#ngButtonTime > span').removeClass('btn-shake'); }, 1500 );
        });
      }
    };
  });
