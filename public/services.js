(function() {
  const SERVICES = angular.module('blues.services', []);

  SERVICES.factory('Auth', function ($http, $location, $window) {
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
