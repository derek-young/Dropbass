(function() {
  const AUTH = angular.module('blues.auth', []);

  AUTH.controller('AuthController', function ($scope, $window, $location, Auth) {
    $scope.user = {};

    $scope.signin = () => {
      Auth.signin($scope.user)
        .then((token) => {
          if (token !== 403) {
            $window.localStorage.setItem('com.blues', token);
            return $location.path('/authorized');
          }
          $scope.errorMessage = 'Invalid username or password';
        })
        .catch((error) => console.error(error));
    };
  });
})();
