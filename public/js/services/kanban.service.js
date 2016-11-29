angular.module('kanbanServ', []).factory('kanbanService', function($http, API_ENDPOINT) {
    return{
        UpdateStateFromTasks: function (id,state) {
            return $http({
                method: 'PUT',
                url: API_ENDPOINT.url + '/tasks/'+ id,
                headers: {'Content-Type': 'application/json'},
                data: state
            });
        },
    }
});
