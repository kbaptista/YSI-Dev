angular.module('SprCtrl',[]).controller('SprintController', function($rootScope,$scope,$location, SprintService,ProjectService,$route,$routeParams, UsService){
    function setDisplayMenu() {
        $rootScope.displayProjectMenu = true;
    }
    setDisplayMenu();


    var project_id = $rootScope.projectId;
    $scope.selected = {};
    $scope.projectName = ProjectService.getName();
    $scope.sprintName = $routeParams.sprintName;
    $scope.errorMessage = '';
    $scope.successMessage = '';

    $scope.setIdSprint = function(idSprint){
        SprintService.setSprintId(idSprint);
    };

    SprintService.getSprintFromProject(project_id).success(function(sprints) {
        sprints.forEach(function (element) {
            element.startDate = moment(element.startDate).format('DD MM YYYY');
            element.deadLine = moment(element.deadLine).format('DD MM YYYY');
        });
        $scope.sprints = sprints;
        SprintService.setAllSprints(sprints);
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
                        $scope.successMessage = 'User story successfully added !';

                    })
                    .error(function(err){
                        $scope.errorMessage = 'User story already in this sprint';
                    })
            });
        });

        // if US is not in the sprint yet then add to the good sprint ($scope.selected.sprint)
        // getSprintById and iterate on userStories[]
    };


    $scope.removeTask = function (id) {
        SprintService.removeTask(id).success(function () {
            $route.reload();
        });
    };
});

