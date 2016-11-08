angular.module('UsServ', []).factory('UsService', function($http){
    return{

        createUs: function(desc,effort,priority){
            var dataJson = JSON.stringify({
                description : desc,
                effort : effort,
                priority : priority

            });
            return $http({
                method: 'POST',
                url: 'http://localhost:3000/backlog',
                headers: {'Content-Type' : 'application/json'},
                data: dataJson
            });
        }
    }
});