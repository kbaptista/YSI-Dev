angular.module('traceabilityServ', []).factory('traceabilityService', function($http, API_ENDPOINT){

    return{

        AddCommitToUs: function (id,commit) {
            return $http({
                method: 'POST',
                url: API_ENDPOINT.url + '/userStories/'+ id + '/tracability',
                headers: {'Content-Type': 'application/json'},
                data: commit
            });
        }
    }
});