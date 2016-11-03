angular.module('ProjectServ', []).factory('ProjectService', function($http){
        return{
            getProjects: function(){
                return $http({
                        method: 'GET',
                        url: 'http://localhost:3000/projects'
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
                    url: 'http://localhost:3000/projects',
                    headers: {'Content-Type' : 'application/json'},
                    data: dataJson
                });
            }
        }
});


