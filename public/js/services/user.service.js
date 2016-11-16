angular.module('UserServ', []).factory('UserService', function($http, API_ENDPOINT){

    return{
        getAllUsers: function(){
            return $http({
                method: 'GET',
                url: API_ENDPOINT.url + '/users'
            });
        }
    }
});


