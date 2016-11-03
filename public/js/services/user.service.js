angular.module('UserService', []).factory('User',['$resource', function($resource){
    return($resource('http://localhost:3000/users', {}, {
        query: {
            method: 'GET',
            isArray: true
        }
    }));
}]);