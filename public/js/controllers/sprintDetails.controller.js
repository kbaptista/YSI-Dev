angular.module('SprDetailsCtrl',[]).controller('SprintDetailsController', function($rootScope,$scope, $route, $routeParams, SprintService, UsService, ProjectService){
    function setDisplayMenu() {
        $rootScope.displayProjectMenu = true;
    }
    setDisplayMenu();

    var sprintId;
    var usCurrentSprint = [];

    $scope.usSprints = [];
    $scope.project = [];
    $scope.developpers = [];
    $scope.task = {};
    $scope.TASK = {};
    $scope.projectName = ProjectService.getName();
    $scope.projectId = ProjectService.getId();
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

    ProjectService.getProjectById($scope.projectId).success(function(project){
        $scope.project = project;
        $scope.developpers = $scope.project.developpers;
    });

    $scope.updateUsDone = function(id){
        var data = JSON.stringify({state: 'done'});
        UsService.updateUserStory(id, data).success(function(usDone){
            var data = JSON.stringify({effortDone: usDone.effort});
            SprintService.updateSprint(sprintId,data).success(function(sprintUsDone){

            });
        });
    };
    $scope.createTask = function(){
        var idUS = $scope.task.us._id;
        var nameUs = $scope.task.us.name;
        var taskToCreate = JSON.stringify({
            name: $scope.task.name,
            description: $scope.task.description,
            idUs: idUS,
            usName: nameUs,
            developper : $scope.task.dev.name,
            state: 'todo'
        });
        SprintService.createTask(taskToCreate).success(function(taskCreated){
            var data = {"task" : taskCreated};
            UsService.addTaskToUs(idUS, data).success(function(usUpdated){
                SprintService.getUsFromSprint(sprintId).success(function(usCurrentSprint){
                    $scope.tasks = usCurrentSprint.tasks;
                    $route.reload();
                    $('#modalCreateTask').modal('hide');
                });
            });
        });
    };

    $scope.getTask = function (id) {
        SprintService.getTaskById(id).success(function (data) {
                $scope.TASK = data;
            })
            .error(function(status,data){
                console.log('status error = ' + status);
                console.log('data error = ' + data);
            });
    };

    $scope.updateTask = function (){
        SprintService.updateTask($scope.TASK._id, $scope.TASK).success(function(data){
                $route.reload();
                $('#modalUpdateTask').modal('hide');
            })
            .error(function(status,data){
                console.log('status error = ' + status);
                console.log('data error = ' + data);
            });
    };

    $scope.removeTask = function (id) {
        console.log(id);
        SprintService.removeTask(id).success(function () {
            $route.reload();
        });
    };
});

