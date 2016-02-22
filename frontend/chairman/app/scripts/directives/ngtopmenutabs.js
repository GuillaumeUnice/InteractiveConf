'use strict';

/**
 * @ngdoc directive
 * @name chairmanApp.directive:ngTopMenuTabs
 * @description
 * # ngTopMenuTabs
 */
angular.module('chairmanApp')
  .directive('ngTopMenuTabs', function () {
    return {
      templateUrl: 'views/ngTopMenuTabs.html',
      transclude: true,
      restrict: 'E',
      controller: function ($scope) {
      	$scope.tabs = [];
        $scope.display = false;

      	$scope.select = function(tab) {
      		if(tab.selected) {
            if($scope.display === false) {
              $scope.display = true;
              tab.selected = true;  
            } else {
              $scope.display = false;
              tab.selected = false;   
            }
          } else {
            $scope.display = true;

            angular.forEach($scope.tabs, function(t){
              t.selected = false;
            });
            tab.selected = true;
          }
          
      	};

        $scope.toggle = function() {
          $scope.display = !$scope.display;
        };

        $scope.stopDisplay = function() {
            $scope.display = false;
            angular.forEach($scope.tabs, function(t){
              t.selected = false;
            });
        };

      	this.add = function(tab) {
      		$scope.tabs.push(tab);
      	};
      }
    };
  });
