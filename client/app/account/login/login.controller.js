'use strict';

angular.module('motionCaptchaApp')
  .controller('LoginCtrl', function ($scope, Auth, $location, $http) {
    $scope.user = {};
    $scope.errors = {};
    $scope.captchaSegs = [];

    $http.get('/api/captchaSegs').success(function(captchaSegs) {
      $scope.captchaSegs = captchaSegs;
    });

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

    $scope.returnMotions = [];
    $http.get('/api/motions').success(function(motions) {
            $scope.returnMotions = motions;
          });

    $scope.addGesture = function() {
          if($scope.newThing === '') {
            return;
          }
          $http.post('/api/motions', { name: $scope.user.gesture });
          $scope.user.gesture = '';

          $http.get('/api/motions').success(function(motions) {
            $scope.returnMotions = motions;
          });
    };

  });
