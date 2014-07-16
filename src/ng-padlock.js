(function() {
'use strict';

angular.module('ps.padlock', [])
  .factory('PadlockFactory', ['$rootScope', '$q', '$location',
    function($rootScope, $q, $location) {

      var PadlockOptions = {
        authFailed: 'Padlock:unauthorized',
        authSuccess: 'Padlock:authorized'
      };

      return {
        options: function (opts) {
          angular.extend(PadlockOptions, opts);
        },
        response: function (response) {
          if (response.status === 200 && PadlockOptions.authSuccess) {
            $rootScope.$broadcast(PadlockOptions.authSuccess, response);
          }
          return response || $q.when(response);
        },
        responseError: function (rejection) {
          if (rejection.status === 401) {
            $rootScope.$broadcast(PadlockOptions.authFailed, rejection);
          }
          return $q.reject(rejection);
        }
      };
  }])
  .config(['$httpProvider', function ($httpProvider) {
    $httpProvider.interceptors.push('PadlockFactory');
  }]);

}());