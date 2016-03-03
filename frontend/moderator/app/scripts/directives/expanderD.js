'use strict';

/**
 * @ngdoc directive
 * @name Moderator.directive:expander
 * @description
 * # expander
 */
angular.module('Moderator')
  .directive('expander', function () {
    
    return {
    restrict: 'EA',
    replace: true,
    transclude: true,
    scope: { title:'@expanderTitle',
            id:'@expanderId',
            slideStart:'@slideStart',
            slideStop:'@slideStop'
    },

    link: function(scope, element, attrs) {

      scope.showMe = false;
      scope.toggle = function toggle() {
        scope.showMe = !scope.showMe;

        //}

      };
    },
    template: '<div>' +
    '<div class="title form-group" ng-click="toggle()"> <small>user:{{id}} numéro de slide:{{slideStart}}-{{slideStop}} <br> </small>{{title}}</div>' +
    '<div class="body form-group" ng-show="showMe" ng-transclude></div>' +
    '</div>'

  };
  
  });
