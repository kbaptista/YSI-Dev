angular.module('SprCtrl',[]).controller('SprintController', function($rootScope,$scope,$location, SprintService,ProjectService,$route,$routeParams, UsService){
    function setDisplayMenu() {
        $rootScope.displayProjectMenu = true;
    }
    setDisplayMenu();

    var project_id = $rootScope.projectId;

    $scope.projectName = ProjectService.getName();
    $scope.sprintName = $routeParams.sprintName;


    SprintService.getSprintFromProject(project_id).success(function(sprints){
        sprints.forEach(function(element){
            element.startDate = moment(element.startDate).format('DD MM YYYY');
            element.deadLine = moment(element.deadLine).format('DD MM YYYY');
        });
        $scope.sprints = sprints;
    });

    UsService.getUs(project_id).success(function(listUS){
       $scope.userStories = listUS;
    });

    SprintService.getTasks().success(function(tasks){
            $scope.tasks = tasks;
        });

    $scope.addUsToSprint = function(id){
        UsService.getUserStory(id).success(function(US){
            // if US is not in the sprint yet then add to the good sprint (selectedSprint.name)
            // getSprintById and iterate on userStories[]
        });
    };

    $scope.createTask = function createTask(name,desc){
        if(name !== undefined && desc !== undefined){
            SprintService.createTask(name,desc).success(function(data){
                $route.reload();
                $('#modalCreateTask').modal('hide');
            })
                .error(function(status,data){
                    console.log('status error = ' + status);
                    console.log('data error = ' + data);
                });
        }
    };

    $scope.removeTask = function (id) {
        SprintService.removeTask(id).success(function () {
            $route.reload();
        });
    };
    //selectedSprint.name to get the ng-model select value
});

