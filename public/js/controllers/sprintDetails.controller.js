angular.module('SprDetailsCtrl',[]).controller('SprintDetailsController', function($rootScope,$scope, $route, $routeParams, SprintService, UsService, ProjectService){
    function setDisplayMenu() {
        $rootScope.displayProjectMenu = true;
    }
    setDisplayMenu();

    var sprintId;
    var usCurrentSprint = [];

    $scope.usSprints = [];
    $scope.task = {};
    $scope.projectName = ProjectService.getName();
    $scope.sprintName = $routeParams.sprintName;

    sprintId = SprintService.getSprintId();

    SprintService.getUsFromSprint(sprintId).success(function(usRes){
       $scope.usSprints = usRes;
    });

    SprintService.getUsFromSprint(sprintId).success(function(us) {
        us.forEach(function(element){
           usCurrentSprint = usCurrentSprint.concat(element.tasks);
        });
        $scope.tasks = usCurrentSprint;
    });

    $scope.createTask = function(){
        SprintService.createTask($scope.task).success(function(taskCreated){
            var data = {"task" : taskCreated};
            UsService.addTaskToUs($scope.task.idUs, data).success(function(usUpdated){
                SprintService.getUsFromSprint(sprintId).success(function(usCurrentSprint){
                    $scope.tasks = usCurrentSprint.tasks;
                    $route.reload();
                    $('#modalCreateTask').modal('hide');
                });
            });
        });
    };
});

