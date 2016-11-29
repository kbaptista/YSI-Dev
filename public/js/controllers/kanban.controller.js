angular.module('KanbanCtrl',['dndLists']).controller('KanbanController', function($routeParams, $rootScope, $scope, ProjectService, SprintService, kanbanService) {
    function setDisplayMenu() {
        $rootScope.displayProjectMenu = true;
    }

    var usCurrentSprint = [];
    var sprintId = SprintService.getSprintId();

    SprintService.getUsFromSprint(sprintId).success(function(us) {
        us.forEach(function(element){
            usCurrentSprint = usCurrentSprint.concat(element.tasks);
        });
        $scope.tasks = usCurrentSprint;
        for (var i = 0; i < usCurrentSprint.length; ++i) {
            if(usCurrentSprint[i].etat=="todo")
                $scope.models.lists.TODO.push({name: usCurrentSprint[i].name, idtask: usCurrentSprint[0]._id});
            if(usCurrentSprint[i].etat=="ongoing")
                $scope.models.lists.ONGOING.push({name: usCurrentSprint[i].name, idtask: usCurrentSprint[0]._id});
            if(usCurrentSprint[i].etat=="done")
                $scope.models.lists.DONE.push({name: usCurrentSprint[i].name, idtask: usCurrentSprint[0]._id});
        }
    });

    setDisplayMenu();
    $scope.projectName = ProjectService.getName();
    $scope.sprintName = $routeParams.name;
    $scope.models = {
        selected: null,
        lists: {"TODO": [], "ONGOING": [], "DONE": []}
    };

    // Model to JSON for demo purpose
    $scope.$watch('models', function(model) {
        $scope.modelAsJson = angular.toJson(model, true);
        console.log($scope.modelAsJson)
        // parcourir le modelAsjson
        /*kanbanService.UpdateStateFromTasks(idtask,state).success(function(data){
            $route.reload();
        })
            .error(function(status,data){
                console.log('status error = ' + status);
                console.log('data error = ' + data);
            });*/
    }, true);

});