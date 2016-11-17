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


        createSprint: function(sprint){
            return $http({
                method: 'POST',
                url: API_ENDPOINT.url + '/sprints',
                headers: {'Content-Type' : 'application/json'},
                data: sprint
            });
        },

        removeSprint: function (id) {
            return $http({
                method: 'DELETE',
                url: API_ENDPOINT.url + '/sprints/'+id
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