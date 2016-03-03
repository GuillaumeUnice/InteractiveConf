'use strict';

/**
 * Created by Romain on 22/02/2016.
 */

angular.module('Public')
  .directive('ngInfo', function () {

    return {
      restrict: 'E',
      scope: true,
      replace: true,
      templateUrl: 'views/partials/_header-info.html',
      link: function (scope, elem, attrs) {
        // do stuff
        scope.tAttrs = attrs;

      }
    };

  });










