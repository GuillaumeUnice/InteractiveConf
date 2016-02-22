'use strict';

/**
 * @ngdoc function
 * @name chairmanApp.controller:LoginCtrl
 * @description
 * # LoginCtrl is Controller in order to auth the user
 */
angular.module('chairmanApp')
  .controller('LoginCtrl', function ($scope, $rootScope, socketQuestion, auth) {
    
    $scope.logged = false;

    $scope.login = function(/*data*/) {
      
      var dataJSON = JSON.stringify({
                pseudo: $scope.login.pseudo,
                password: $scope.login.password
      });

      auth.login(dataJSON).then(function(data){
        if(data.token !== undefined) {
          $scope.logged = true;
          // sendToken to all other controller which listen 'loginChanged' => pattern Observer
          $scope.$broadcast('loginChanged', {token: data.token});

        }
      }, function(msg){
        console.log('erreur promesses : ' + msg);
      });
    };
  });
