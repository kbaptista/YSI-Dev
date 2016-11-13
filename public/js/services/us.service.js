angular.module('UsServ', []).factory('UsService', function($http, API_ENDPOINT){

    return{

        getUs: function(id_project){
            return $http({
                method: 'GET',
                url: API_ENDPOINT.url + '/userStories/'+id_project
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
                url: API_ENDPOINT.url + '/userStories',
                headers: {'Content-Type' : 'application/json'},
                data: dataJson
            });
        },

        removeUserStory: function (id) {
            return $http({
                method: 'DELETE',
                url: API_ENDPOINT.url + '/userStories/'+id
            });
        },

        editUserStory: function(id){
            return $http({
                method: 'GET',
                url: API_ENDPOINT.url + '/userStories/edit/'+id
            });
        }
    }
});