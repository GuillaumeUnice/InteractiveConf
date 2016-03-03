'use strict';

/**
 *
 */

angular.module('Public')
  .controller('LoginCtrl', function ($scope, $http, $location, CONFIG, UserService) {

    $scope.loginPrenom = '';
    $scope.loginNom = '';

    $scope.signUp = function () {
      var newUser = {
        prenom : $scope.loginPrenom.charAt(0).toUpperCase() + $scope.loginPrenom.substr(1).toLocaleLowerCase(),
        nom : $scope.loginNom.charAt(0).toUpperCase() + $scope.loginNom.substr(1).toLocaleLowerCase()
      };
      $http.post(CONFIG.baseUrlApi + '/public/register/', newUser)
        .success(function (data) {
          //console.log('signUp succes');
          //console.log(data);
          UserService.set({
            id: data.user.id,
            prenom : data.user.prenom,
            nom : data.user.nom,
            hash : data.user.hash
          });
          $location.path('/');
        })
        .error(function (data) {
          //console.log('signUp fail');
          //console.log(data);
          // afficher une notif failure ?
        });


    };

  });
