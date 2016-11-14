angular.module('ProjectServ', []).factory('ProjectService', function($http, API_ENDPOINT){
        var project = {
            id:'',
            name : '',
            description: ''
        };

        return{

            getName: function(){
              return project.name;
            },

            setId: function(newId){
                project.id = newId;
            },

            getId: function(){
                return project.id;
            },

            setName: function(newName){
                project.name = newName;
            },

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


