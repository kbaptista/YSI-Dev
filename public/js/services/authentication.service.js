angular.module('AuthService', []).factory('AuthenticationService', function(){
    var auth = {
        isLogged: false
    };
    return auth;
})

.factory('UserService', function($http){
    return {
        logIn: function(email, password){
            var encodedString = 'email='+ encodeURIComponent(email) + '&password=' + encodeURIComponent(password);
            return $http({
                method: 'POST',
                url: 'http://localhost:3000/login',
                data: encodedString,
                headers: {'Content-Type':'application/x-www-form-urlencoded'}
        })
        }
    }
});
