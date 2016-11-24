angular.module('SprServ', []).factory('SprintService', function($http, API_ENDPOINT) {

    var sprint = {
        id:'',
        name:'',
        startDate:'',
        deadLine:'',
        idProject:'',
        us:[]
    };

    var allSprints = [];

    return{

        setAllSprints: function(sprintFull){
            allSprints = sprintFull;
        },

        getAllSprints: function(){
            return allSprints;
        },

        setSprintId: function(id){
            sprint.id = id;
        },

        getSprintId: function(){
            return sprint.id
        },

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

        createTask: function(task){
            return $http({
                method: 'POST',
                url: API_ENDPOINT.url + '/tasks',
                headers: {'Content-Type' : 'application/json'},
                data: task
            });
        },

        addUsToSprint: function(id,us){
            return $http({
                method: 'POST',
                url: API_ENDPOINT.url + '/sprints/' + id + '/us',
                headers: {'Content-Type' : 'application/json'},
                data: us
            })
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
        },

        getTasksFromSprint: function(id){
            return $http({
                method: 'GET',
                url: API_ENDPOINT.url + '/sprints/' + id + '/tasks'
            });
        }
   }

});