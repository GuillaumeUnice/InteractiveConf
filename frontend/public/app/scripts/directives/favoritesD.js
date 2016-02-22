'use strict';

/**
 * Created by Romain on 09/12/2015.
 */

angular.module('Public')
  .directive('ngFavorites', function () {

    return {
      restrict: 'E',
      templateUrl: 'views/partials/_favorites.html'
    };

  });
