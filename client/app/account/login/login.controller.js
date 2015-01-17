'use strict';

angular.module('motionCaptchaApp')
  .controller('LoginCtrl', function ($scope, Auth, $location) {
    $scope.user = {};
    $scope.errors = {};

    $scope.login = function(form) {
      $scope.submitted = true;
      console.log($scope.user.captcha === "true");

      if(form.$valid) {
        if ($scope.user.captcha === "true") {
          Auth.login({
            email: $scope.user.email,
            password: $scope.user.password,
            captcha: $scope.user.captcha,
          })
          .then( function() {
          // Logged in, redirect to home
            $location.path('/admin');
          })
          .catch( function(err) {
            $scope.errors.other = err.message;
          });
        }
      }
    };

  });
