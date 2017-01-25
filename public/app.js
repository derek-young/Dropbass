(() => {
    const APP = angular.module('blues', [
      'ngRoute',
      'blues.auth',
      'blues.player',
      'blues.services'
    ]);

    APP.config(function ($routeProvider, $httpProvider) {
      $routeProvider
        .when('/signin', {
          templateUrl: '/auth/signin.html',
          controller: 'AuthController'
        })
        .otherwise({
          templateUrl: 'player.html',
          controller: 'PlayerController'
        });

      $httpProvider.interceptors.push('AttachTokens');
    });

    APP.factory('AttachTokens', function ($window) {
      var attach = {
        request: function (object) {
          var jwt = $window.localStorage.getItem('com.blues');
          if (jwt) {
            object.headers['x-access-token'] = jwt;
          }
          object.headers['Allow-Control-Allow-Origin'] = '*';
          return object;
        }
      };
      return attach;
    });

    APP.run(function ($rootScope, $location, Auth) {
      $rootScope.$on('$routeChangeStart', function (evt, next, current) {
        if (!Auth.isAuth()) {
          $location.path('/signin');
        }
      });
    });

})();
