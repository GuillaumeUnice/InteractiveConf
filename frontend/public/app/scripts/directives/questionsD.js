'use strict';

/**
 * Created by Romain on 09/12/2015.
 */

angular.module('Public')
  .directive('ngQuestions', function () {

    return {
      restrict: 'E',
      templateUrl: 'views/partials/_question-answer.html'
    };

  });
