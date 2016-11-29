angular.module('kanbanServ', []).factory('KanbanService', function($http, API_ENDPOINT) {
    return{
        UpdateStateTask: function (id,state) {
            return $http({
                method: 'PUT',
                url: API_ENDPOINT.url + '/tasks/'+ id,
                headers: {'Content-Type': 'application/json'},
                data: state
            });
        }
    }
});
