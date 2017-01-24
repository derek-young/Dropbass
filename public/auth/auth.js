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

  AUTH.factory('Auth', function ($http, $location, $window) {
    const signin = function (user) {
      return $http({
        method: 'POST',
        url: '/signin',
        data: user
      })
      .then((res) => {
        return res.data.token;
      })
      .catch((err) => {
        return err.status;
      });
    };

    const isAuth = function () {
      return $window.localStorage.getItem('com.blues') !== null && $window.localStorage.getItem('com.blues') !== undefined;
    };

    const signout = function () {
      $window.localStorage.removeItem('com.blues');
      $location.path('/signin');
    };

    return {
      signin: signin,
      isAuth: isAuth,
      signout: signout
    };
  });
})();
