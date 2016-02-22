'use strict';

/**
 * @ngdoc directive
 * @name chairmanApp.directive:ngTopMenuTab
 * @description
 * # ngTopMenuTab
 */
angular.module('chairmanApp')
  .directive('ngTopMenuTab', function () {
    return {
      restrict: 'E',
      transclude: true,
      templateUrl: 'views/ngTopMenuTab.html',
      scope: {
      	title: '@'
      },
      require: '^ngTopMenuTabs',
      link: function(scope, element, attrs, ngTopMenuTabsCtrl) {
        ngTopMenuTabsCtrl.add(scope);
      }
    };
  });
