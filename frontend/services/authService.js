app.service('AuthService', function () {
    this.setTokens = function (accessToken, refreshToken) {
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
    };

    this.getAccessToken = function () {
        return localStorage.getItem('accessToken');
    };

    this.getAccessToken = function () {
        return localStorage.getItem('refreshToken');
    };
});