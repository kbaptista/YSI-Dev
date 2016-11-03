angular.module('ProjectCtrl',[]).controller('ProjectController',['$scope','$location', 'ProjectService','$route', function($scope,$location, ProjectService,$route){
    ProjectService.getProjects().success(function(data){
        $scope.projects = data;
    })
        .error(function(status,data){
            console.log('status error = ' + status);
            console.log('data error = ' + data);
        });

    $scope.createProject = function createProject(name,desc,nbSprint,start,duration){
        if(name !== undefined && desc !== undefined && nbSprint !== undefined && start !== undefined && duration !== undefined){
            ProjectService.createProject(name,desc,nbSprint,start,duration).success(function(data){
                $route.reload();
                $('#modalCreateProject').modal('hide');
            })
                .error(function(status,data){
                    console.log('status error = ' + status);
                    console.log('data error = ' + data);
                });
        }
    }
}]);
