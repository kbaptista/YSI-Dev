angular.module('ProjectCtrl',[]).controller('ProjectController',function($scope,$location, ProjectService,$route, AuthenticationService, ProjectService){

    $scope.setProjectName = function(projectName){
        ProjectService.setName(projectName);
    };

    if(!AuthenticationService.isAuthenticated()){
        ProjectService.getPublicProjects().success(function(publicProjects){
            $scope.projects = publicProjects;
        })
            .error(function(status,data){
                console.log('status error = ' + status);
                console.log('data error = ' + data);
            });
    }

    if(AuthenticationService.isAuthenticated()) {
        ProjectService.getProjects().success(function (allProjects) {
                $scope.projects = allProjects;
            })
            .error(function (status, data) {
                console.log('status error = ' + status);
                console.log('data error = ' + data);
            });
    }

    $scope.createProject = function createProject(name,desc,nbSprint,start,duration, isPrivate){
        console.log(isPrivate);
        if(name !== undefined && desc !== undefined && nbSprint !== undefined && start !== undefined && duration !== undefined && isPrivate !== undefined){
            ProjectService.createProject(name,desc,nbSprint,start,duration, isPrivate).success(function(data){
                $route.reload();
                $('#modalCreateProject').modal('hide');
            })
                .error(function(status,data){
                    console.log('status error = ' + status);
                    console.log('data error = ' + data);
                });
        }
    }
});
