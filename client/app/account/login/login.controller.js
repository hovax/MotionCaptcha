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
      $http.put('/api/motions').success(function(captcha) {
        console.log("patch called");
        $scope.user.captcha = captcha;

        if(1) {
          if ($scope.user.captcha === true) {
            Auth.login({
              email: $scope.user.email,
              password: $scope.user.password,
            })
            .then( function() {
              console.log('log');
            // Logged in, redirect to home
              $location.path('/admin');
            })
            .catch( function(err) {
              $scope.errors.other = err.message;
            });
          }
        }
      });
    };

    $scope.returnMotions = [];
    $http.get('/api/motions').success(function(motions) {
            $scope.returnMotions = motions;
          });

    $scope.addGesture = function() {
      if($scope.newThing === '') {
        return;
      }

      // $http.post('/api/motions', { name: $scope.user.gesture }).success(function(compareResult) {
      //   $scope.compareResult = compareResult;
      // });
      $http.post('/api/motions', { name: $scope.user.gesture }).success(function(compareResult) {
            $scope.compareResult = compareResult;
          });

      $scope.user.gesture = '';

      $http.get('/api/motions').success(function(motions) {
            $scope.returnMotions = motions;
          });
    };

  });
