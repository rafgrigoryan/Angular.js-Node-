angular.module('myApp')
  .controller('LoginController', function ($scope, AuthService, $http, $window) {
    $scope.login = function (event) {
      event.preventDefault();

      var username = $scope.username;
      var password = $scope.password;

      $http.post('http://localhost:3000/login', { username: username, password: password })
        .then(function (response) {
          sessionStorage.removeItem('username');
          sessionStorage.setItem('username', JSON.stringify(username));
          AuthService.setTokens(response.data.data.accessToken, response.data.data.refreshToken);
          $window.location.href = '#!/main'
          console.log('Login successful');
        })
        .catch(function (error) {
          console.error('Login failed: ', error);
          $scope.error = true; 
          $scope.errorMessage = 'Login failed. Please check your credentials.';
        });
    };
  });