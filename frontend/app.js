var app = angular.module('myApp', ['ngRoute']);
app
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/login.html',
        controller: 'LoginController'
      })
      .when('/main', {
        templateUrl: 'views/main.html',
        controller: 'MainController',
      })
      .when('/main/channel/:channelId', {
        templateUrl: 'views/main.html',
        controller: 'MainController',
      })
      .when('/main/user/:userId', {
        templateUrl: 'views/main.html',
        controller: 'MainController',
      })
      .otherwise({
        redirectTo: '/'
      });

  });

