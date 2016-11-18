angular.module('UsServ', []).factory('UsService', function($http, API_ENDPOINT){

    return{

        getUs: function(id_project){
            return $http({
                method: 'GET',
                url: API_ENDPOINT.url + '/userStories/'+id_project + '/project'
            });
        },

        createUserStories: function(name,desc,effort,priority,id_project){
            var test = {
                "_id": "582e31785b987c3bec0d0957",
                "name": "0",
                "startDate": "2016-11-16T23:00:00.000Z",
                "deadLine": "2016-11-23T23:00:00.000Z",
                "idProject": "582e31785b987c3bec0d0954"
            };

            var dataJson = JSON.stringify({
                name : name,
                description : desc,
                effort : effort,
                priority : priority,
                idProject : id_project,
                sprint: test
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

        getUserStory: function(id){
            return $http({
                method: 'GET',
                url: API_ENDPOINT.url + '/userStories/'+id
            });
        },

        updateUserStory: function (id,updateUS) {
            return $http({
                method: 'PUT',
                url: API_ENDPOINT.url + '/userStories/'+ id,
                headers: {'Content-Type': 'application/json'},
                data: updateUS
            });
        }
    }
});