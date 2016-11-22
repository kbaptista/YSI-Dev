angular.module('SprCtrl',[]).controller('SprintController', function($rootScope,$scope,$location, SprintService,ProjectService,$route,$routeParams, UsService){
    function setDisplayMenu() {
        $rootScope.displayProjectMenu = true;
    }
    setDisplayMenu();

    var usSprint = [];
    var sprintIdSelected;
    var project_id = $rootScope.projectId;
    $scope.selected = {};
    $scope.projectName = ProjectService.getName();
    $scope.sprintName = $routeParams.sprintName;
    $scope.usSprints = [];

    $scope.setIdSprint = function(idSprint){
        sprintIdSelected = idSprint;

        $scope.sprints.forEach(function(sprint){
            if(sprint._id.localeCompare(sprintIdSelected) == 0) {
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
        console.log(usSprint);
        $scope.usSprints = usSprint;
    };

    function test(){
        console.log('call');
        $scope.usSprints = usSprint;
    }

    $scope.$on('$routeUpdate',test);

    SprintService.getSprintFromProject(project_id).success(function(sprints) {
        sprints.forEach(function (element) {
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

    $scope.addUsToSprint = function(id_us){
        SprintService.getSprintById($scope.selected.sprint).success(function(sprintRes){
            var id_sprint = JSON.stringify({sprint: sprintRes._id});
            UsService.updateUserStory(id_us, id_sprint).success(function(usRes){

                var userStoryToAdd = JSON.stringify({us: usRes});
                SprintService.addUsToSprint(sprintRes._id, userStoryToAdd).success(function(sprintReturn){
                    $route.reload();
                })
            });
        });

        // if US is not in the sprint yet then add to the good sprint ($scope.selected.sprint)
        // getSprintById and iterate on userStories[]
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

