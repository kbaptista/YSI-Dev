angular.module('ProjectServ', []).factory('ProjectService', function($http, API_ENDPOINT){
        var project = {
            id: '',
            name : '',
            description: ''
        };

        return{

            getName: function(){
              return project.name;
            },

            setName: function(newName){
                project.name = newName;
            },

            getId: function(){
                return project.id;
            },

            setId: function(newId){
                project.id = newId;
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


