var Auth = {
  url: "http://localhost:8000/example/server.php",
  userParam: "?username=",
  passParam: "&password=",
  username: "username",
  password: "password",
  setUrl: function() {
    return this.url + this.userParam + this.username + this.passParam + this.password;
  }
};

var app = angular.module("Padlock", ["ps.padlock"]);
app.controller("DemoCtrl", function($scope, $http, PadlockFactory, $location) {
    // Change events if you so will.

    // PadlockFactory.options({
    //     authFailed: 'Padlock:unauthorized',
    //     authSuccess: 'Padlock:authorized'
    // });
    $scope.$on('Padlock:unauthorized', function(event) {
      console.log('NOT AUTHED REDIRECTING...');
      console.log(event);
      $location.url('/user/authorize');
    });
    $scope.$on('Padlock:authorized', function(event) {
      console.log('ALL IS WELL');
      console.log(event);
    });
    $http.get(Auth.setUrl())
    .success(function(data, status, headers, config) {
      console.log(data);
    });

});