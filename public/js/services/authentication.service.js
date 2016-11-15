angular.module('AuthService', []).factory('AuthenticationService', function($http, $q, API_ENDPOINT){
    var LOCAL_TOKEN_KEY = 'tokenKey';
    var isAuthenticated = false;
    var authToken;

    function loadUserCredentials(){
        var token = window.localStorage.getItem(LOCAL_TOKEN_KEY);
        if(token)
            useCredentials(token);
    }

    function storeUserCredentials(token){
        window.localStorage.setItem(LOCAL_TOKEN_KEY,token);
        useCredentials(token);
    }

    function useCredentials(token){
        isAuthenticated = true;
        authToken = token;

        $http.defaults.headers.common.Authorization = authToken; // Headers that are common for all requests (token)
    }

    function destroyUserCredentials(){
        authToken = undefined;
        isAuthenticated = false;
        $http.defaults.headers.common.Authorization = undefined;
        window.localStorage.removeItem(LOCAL_TOKEN_KEY);
    }

    var register = function(user){
        return $q(function(resolve,reject){
            $http.post(API_ENDPOINT.url + '/signup', user).then(function(result){
                if(result.data.success){
                    resolve(result.data.msg);
                }
                else{
                    reject(result.data.msg);
                }
            });
        });
    };

    var login = function(user){
        return $q(function(resolve,reject){
            $http.post(API_ENDPOINT.url + '/authenticate',user).then(function(result){
                if(result.data.success){
                    storeUserCredentials(result.data.token);
                    resolve(result.data.msg);
                }
                else{
                    reject(result.data.msg);
                }
            });
        });
    };

    var logout = function(){
        destroyUserCredentials();
    };

    var username = function() {
        return $http.get(API_ENDPOINT.url + '/getName');
    };


    loadUserCredentials();

    return {
        login: login,
        register: register,
        logout: logout,
        username: username,
        isAuthenticated: function() {return isAuthenticated;}
    };

})

.factory('AuthInterceptor', function($rootScope,$q, $rootScope){

    return {

        responseError: function(response){
            if(response.status == 409) {
                $rootScope.emailAlreadyExists = 'Username with this email already exists';
               return $q.reject(response);
            }
            else if(response.status == 401){
                $rootScope.authenticationFailed = 'Wrong username or password';
                return $q.reject(response);
            }
            $rootScope.$broadcast({
                401: 'auth-not-authenticated'
            }[response.status], response);
            return $q.reject(response);
        }
    };
})

.config(function ($httpProvider) {
    $httpProvider.interceptors.push('AuthInterceptor');
});