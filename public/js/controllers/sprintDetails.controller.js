angular.module('SprDetailsCtrl',[]).controller('SprintDetailsController', function($rootScope,$scope, $route, $routeParams, SprintService, UsService, ProjectService){
    function setDisplayMenu() {
        $rootScope.displayProjectMenu = true;
    }
    setDisplayMenu();

    var sprintId;

    $scope.usSprints = [];
    $scope.task = {};
    $scope.projectName = ProjectService.getName();
    $scope.sprintName = $routeParams.sprintName;

    sprintId = SprintService.getSprintId();

    SprintService.getUsFromSprint(sprintId).success(function(usRes){
       $scope.usSprints = usRes;
    });

    $scope.createTask = function(){
        SprintService.createTask($scope.task).success(function(taskCreated){
            var data = {"task" : taskCreated};
            UsService.addTaskToUs($scope.task.idUs, data).success(function(usUpdated){
                SprintService.getTasksFromSprint(sprintId).success(function(allTasks){
                    $scope.tasks = allTasks;
                    console.log(allTasks);
                    $route.reload();
                    $('#modalCreateTask').modal('hide');
                });
            });
        });
    };
});

