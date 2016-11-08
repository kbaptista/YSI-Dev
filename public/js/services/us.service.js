angular.module('UsServ', []).factory('UsService', function($http){

    return{

        getUs: function(){
            return $http({
                method: 'GET',
                url: 'http://localhost:3000/userStories'
            });
        },

        createUserStories: function(name,desc,effort,priority){
            var dataJson = JSON.stringify({
                name : name,
                description : desc,
                effort : effort,
                priority : priority

            });
            return $http({
                method: 'POST',
                url: 'http://localhost:3000/userStories',
                headers: {'Content-Type' : 'application/json'},
                data: dataJson
            });
        }
    }
});