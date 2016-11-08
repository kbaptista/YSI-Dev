angular.module('ProjectServ', []).factory('ProjectService', function($http, API_ENDPOINT){
        return{
            getProjects: function(){
                return $http({
                        method: 'GET',
                        url: API_ENDPOINT.url + '/projects'
                    });
            },

            createProject: function(name,desc,nbSprint,start,duree){
                var dataJson = JSON.stringify({
                   start: start,
                    nbSprint: nbSprint,
                    dureeSprint: duree,
                    name: name,
                    description: desc
                });
                return $http({
                    method: 'POST',
                    url: API_ENDPOINT.url + '/projects',
                    headers: {'Content-Type' : 'application/json'},
                    data: dataJson
                });
            }
        }
});


