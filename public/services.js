(function() {
  const SERVICES = angular.module('blues.services', []);

  SERVICES.factory('Request', function($http) {
    return {
      get: (url) => {
        return $http({
          method: 'GET',
          url: url
        })
        .then((res) => {
          return res;
        })
        .catch((err) => {
          throw err;
        });
      }
    }
  });
})();
