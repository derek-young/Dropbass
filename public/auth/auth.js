(function() {
  const AUTH = angular.module('blues.auth', []);

  AUTH.controller('AuthController', function ($scope, $window, $location, Auth) {
    $scope.user = {};

    $scope.signin = function () {
      Auth.signin($scope.user)
        .then(function (token) {
          $window.localStorage.setItem('com.blues', token);
          $location.path('/authorized');
        })
        .catch(function (error) {
          console.error(error);
        });
    };
  });
})();
