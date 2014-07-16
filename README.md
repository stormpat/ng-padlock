## Angularjs Padlock

This is a very simple $http interceptor for a REST or other backend with authentication. Note, this is not
a complete auth solution, but for simple projects with http requests it should work just fine. You will still have to
do all the dirtywork in your backend.

Basically it boils down to:

- This module listens to http headers
- If the response headers are OK (200) it will let the user continue (and optionally fire an event)
- If the response headers are Unauthorized (401) it will fire an event you can listen to.

### Usage

Grab the [ng-padlock.js](https://github.com/stormpat/ng-padlock/blob/master/src/ng-padlock.js) module and add it to your
angular application.

```
// Example in a controller
var app = angular.module("YourApplication", ["ps.padlock"]);
app.controller("YourController", function($scope, $http, PadlockFactory, $location) {
    // Optionally set set the fired events if you want to customize them,
    // the defaults are listed below.
    PadlockFactory.options({
        authFailed: 'Padlock:unauthorized', // default event
        authSuccess: 'Padlock:authorized' // default event
    });
    $scope.$on('Padlock:unauthorized', function(event) {
      console.log('NOT AUTHED REDIRECTING...');
      console.log(event);
      // redirect to login page
      $location.url('/user/authorize');
    });
    $scope.$on('Padlock:authorized', function(event) {
      console.log('ALL IS WELL');
      console.log(event);
      // do other stuff
    });
    // Your logic to get data from the server
    // and handle authentication.
    $http.get('/route/that/is/protected')
      .success(function(data, status, headers, config) {
      // ... //
    });

  });
```

### Options

You can set the factory options for the module to change the events fired.
```
  PadlockFactory.options({
      authFailed: 'Namespace:yourEvent', // change the fail event
      authSuccess: false // will NOT fire event on 200 response
  });
```

### Tests

Tests can be run via Karma, `karma start karma.config.js`

### Note

See the example folder for a example with a *naive* server returning headers
on GET requests.

### License

MIT.


