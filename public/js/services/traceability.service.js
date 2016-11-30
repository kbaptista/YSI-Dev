angular.module('traceabilityServ', []).factory('traceabilityService', function($http, API_ENDPOINT){

    return{

        AddCommitToUs: function (id,commit) {
            return $http({
                method: 'PUT',
                url: API_ENDPOINT.url + '/traceability/'+ id,
                headers: {'Content-Type': 'application/json'},
                data: commit
            });
        },
    }
});