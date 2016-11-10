angular.module('ProjectServ', []).factory('ProjectService', function($http, API_ENDPOINT){
        return{
            getProjects: function(){
                return $http({
                        method: 'GET',
                        url: API_ENDPOINT.url + '/projects'
                    });
            },

            getPublicProjects: function(){
                return $http({
                    method: 'GET',
                    url: API_ENDPOINT.url + '/public/projects'
                })
            },

            createProject: function(name,desc,nbSprint,start,duree, isPrivate){
                var dataJson = JSON.stringify({
                   start: start,
                    nbSprint: nbSprint,
                    dureeSprint: duree,
                    name: name,
                    isPrivate : isPrivate,
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


