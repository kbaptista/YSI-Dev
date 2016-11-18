angular.module('SprServ', []).factory('SprintService', function($http, API_ENDPOINT) {

    return{

        getSprintById: function(id_sprint){
            return $http({
                method: 'GET',
                url: API_ENDPOINT.url + '/sprints/'+id_sprint
            });
        },

        getSprintFromProject: function(id_project){
            return $http({
                method: 'GET',
                url: API_ENDPOINT.url + '/sprints/'+ id_project + '/project'
            });
        },

        getTasks: function(){
            return $http({
                method: 'GET',
                url: API_ENDPOINT.url + '/tasks'
            });
        },

        createSprint: function(sprint){
            return $http({
                method: 'POST',
                url: API_ENDPOINT.url + '/sprints',
                headers: {'Content-Type' : 'application/json'},
                data: sprint
            });
        },

        createTask: function(name,desc){
            var dataJson = JSON.stringify({
                name : name,
                description : desc
            });
            return $http({
                method: 'POST',
                url: API_ENDPOINT.url + '/tasks',
                headers: {'Content-Type' : 'application/json'},
                data: dataJson
            });
        },

        removeSprint: function (id) {
            return $http({
                method: 'DELETE',
                url: API_ENDPOINT.url + '/sprints/'+id
            });
        },

        removeTask: function (id) {
            return $http({
                method: 'DELETE',
                url: API_ENDPOINT.url + '/tasks/'+id
            });
        },

        updateSprint: function (id,updateSprint) {
            return $http({
                method: 'PUT',
                url: API_ENDPOINT.url + '/sprints/'+ id,
                headers: {'Content-Type': 'application/json'},
                data: updateSprint
            });
        }
   }

});