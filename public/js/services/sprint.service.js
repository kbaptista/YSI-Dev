angular.module('SprServ', []).factory('SprintService', function($http, API_ENDPOINT) {

    return{

        getSprintById: function(id_sprint){
            return $http({
                method: 'GET',
                url: API_ENDPOINT.url + '/sprint/'+id_sprint
            });
        },

        SprintFromProject: function(id_project){
            return $http({
                method: 'GET',
                url: API_ENDPOINT.url + '/sprint/'+id_project
            });
        },

       CountSprintFromProject: function(id_project){
            return $http({
                method: 'GET',
                url: API_ENDPOINT.url + '/sprint/'+id_project
            });
        },

        createSprint: function(name,startDate,deadLine,id_project){
            var dataJson = JSON.stringify({
                name:name,
                startDate:startDate,
                deadLine:deadLine,
                idProject : id_project

            });
            return $http({
                method: 'POST',
                url: API_ENDPOINT.url + '/sprint',
                headers: {'Content-Type' : 'application/json'},
                data: dataJson
            });
        },

        removeSprint: function (id) {
            return $http({
                method: 'DELETE',
                url: API_ENDPOINT.url + '/sprint/'+id
            });
        },

        updateSprint: function (id,updateSprint) {
            return $http({
                method: 'PUT',
                url: API_ENDPOINT.url + '/sprint/'+ id,
                headers: {'Content-Type': 'application/json'},
                data: updateSprint
            });
        }
   }

});