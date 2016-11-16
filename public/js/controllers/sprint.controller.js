angular.module('SprCtrl',[]).controller('SprintController', function($scope,$location, SprintService,ProjectService,$route,$routeParams){

    var id_project = $routeParams.id;
    var sprintById = {};
    var projectNbSprint = [];
    $scope.displayProjectMenu == true;

    $scope.projectName = ProjectService.getName();

    $scope.getSprintById = function (id) {
        SprintService.getSprintById(id).success(function (data) {
            $scope.sprintById = data;
        })
            .error(function(status,data){
                console.log('status error = ' + status);
                console.log('data error = ' + data);
            });
    };

    $scope.SprintFromProject = function(id_project){
        SprintService.SprintFromProject(id_project).success(function (data) {
            $scope.sprints = data;
        })
            .error(function (status, data) {
                console.log('status error = ' + status);
                console.log('data error = ' + data);
            });
    };

    $scope.CountSprintFromProject= function(id_project){
        SprintService.SprintFromProject(id_project).success(function (count) {
            for(var i = 1;i <= count; ++i){
                projectNbSprint.push(i);
            }
        })
            .error(function (status, projectNbSprint) {
                console.log('status error = ' + status);
                console.log('data error = ' + projectNbSprint);
            });
    };

    $scope.createSprint = function createSprint(name,startDate,deadLine,id_project){
        if(name !== undefined && startDate !== undefined && deadLine !== undefined && id_project !== undefined){
            SprintService.createSprint(name,startDate,deadLine,id_project).success(function(data){
                $route.reload();
            })
                .error(function(status,data){
                    console.log('status error = ' + status);
                    console.log('data error = ' + data);
                });
        }
    };

    $scope.removeSprint = function (id) {
        console.log(id);
        SprintService.removeSprint(id).success(function () {
            $route.reload();
        });
    };

});

