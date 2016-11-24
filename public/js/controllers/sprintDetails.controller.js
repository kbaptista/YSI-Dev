angular.module('SprDetailsCtrl',[]).controller('SprintDetailsController', function($rootScope,$scope, $route, $routeParams, SprintService, UsService, ProjectService){
    function setDisplayMenu() {
        $rootScope.displayProjectMenu = true;
    }
    setDisplayMenu();

    var sprintId;
    var usSprint = [];
    var allSprints;

    $scope.usSprints = [];
    $scope.task = {};
    $scope.projectName = ProjectService.getName();
    $scope.sprintName = $routeParams.sprintName;

    sprintId = SprintService.getSprintId();
    allSprints = SprintService.getAllSprints();

    allSprints.forEach(function(sprint){
        if(sprint._id.localeCompare(sprintId) == 0) {
            sprint.us.forEach(function (us) {
                usSprint.push({
                    name: us.name,
                    id: us._id,
                    description: us.description,
                    effort: us.effort,
                    priority: us.priority,
                    sprint: us.sprint,
                    idProject: us.idProject,
                    tasks: us.tasks
                });
            });
        }
    });
    $scope.usSprints = usSprint;

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

