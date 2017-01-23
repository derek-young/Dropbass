(function() {
  const SERVICES = angular.module('blues.services', []);

  SERVICES.factory('Auth', function ($http, $location, $window) {
    var signin = function (user) {
      return $http({
        method: 'POST',
        url: '/signin',
        data: user
      })
      .then(function (resp) {
        return resp.data.token;
      });
    };

    var isAuth = function () {
      return !!$window.localStorage.getItem('com.blues');
    };

    var signout = function () {
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
