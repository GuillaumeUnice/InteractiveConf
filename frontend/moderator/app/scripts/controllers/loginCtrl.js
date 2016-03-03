'use strict';

/**
 * @ngdoc function
 * @name Moderator.controller:LoginctrlCtrl
 * @description
 * # LoginctrlCtrl
 * Controller of the Moderator
 */
angular.module('Moderator')
  .controller('LoginCtrl', function ($scope, $http, $cookies, $location, inscription, CONFIG) {


    $scope.login = {
      pseudo: "",
      password: ""
    };

    $scope.signup = {
      pseudo: "",
      password: ""
    };



    /**
     create a new compte
     */
    $scope.createUser = function () {
      $scope.signup.password = $scope._base64.encode($scope.signup.password);
      inscription.createUser($scope.signup);
    };

    $scope.checkLogin = function () {
      $location.path('/');
      $cookies.putObject('user', {});
      $scope.logged = true;
     /* $scope.login.password = $scope._base64.encode($scope.login.password);
      $http.post(CONFIG.baseUrlApi + "/auth/signin", $scope.login)
        .success(function (data) {
          if (data.length > 0) {
            $scope.logged = true;
          }
          $cookies.putObject('user', {});
          $scope.login.password = "";
        }).error(function (data) {
        console.log("ko");

      });*/
    };
  });
