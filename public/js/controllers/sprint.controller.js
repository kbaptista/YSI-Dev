angular.module('SprCtrl',[]).controller('SprintController', function($rootScope,$scope,$location, SprintService,ProjectService,$routeParams, UsService){
    function setDisplayMenu() {
        $rootScope.displayProjectMenu = true;
    }
    setDisplayMenu();

    var project_id = $rootScope.projectId;
    $scope.selected = {};

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


    $scope.addUsToSprint = function(id){
        SprintService.getSprintById($scope.selected.sprint).success(function(sprintRes){

        });
            // if US is not in the sprint yet then add to the good sprint (selectedSprint.name)
            // getSprintById and iterate on userStories[]


    };

});

