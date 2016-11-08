angular.module('UsServ', []).factory('UsService', function($http){

    return{

        getUs: function(id_project){
            return $http({
                method: 'GET',
                url: 'http://localhost:3000/userStories/'+id_project
            });
        },

        createUserStories: function(name,desc,effort,priority,id_project){
            var dataJson = JSON.stringify({
                name : name,
                description : desc,
                effort : effort,
                priority : priority,
                idProject : id_project

            });
            return $http({
                method: 'POST',
                url: 'http://localhost:3000/userStories/',
                headers: {'Content-Type' : 'application/json'},
                data: dataJson
            });
        }
    }
});