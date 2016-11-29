angular.module('KanbanCtrl',['dndLists']).controller('KanbanController', function($routeParams, $rootScope, $scope, ProjectService, SprintService, KanbanService) {
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
            if(usCurrentSprint[i].state=="todo")
                $scope.models.lists.TODO.push({name: usCurrentSprint[i].name, idtask: usCurrentSprint[0]._id});
            if(usCurrentSprint[i].state=="ongoing")
                $scope.models.lists.ONGOING.push({name: usCurrentSprint[i].name, idtask: usCurrentSprint[0]._id});
            if(usCurrentSprint[i].state=="done")
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
        var todo = model.lists.TODO;
        var ongoing = model.lists.ONGOING;
        var done = model.lists.DONE;
        var todoData = JSON.stringify({
            state: 'todo'
        });
        var ongoingData = JSON.stringify({
            state: 'ongoing'
        });
        var doneData = JSON.stringify({
            state: 'done'
        });
        for(var i in todo){
            var idTask = todo[i].idtask;
            KanbanService.UpdateStateTask(idTask,todoData).success(function(taskRes){
            });
        }

        for(var i in ongoing){
            var idTask = todo[i].idtask;
            KanbanService.UpdateStateTask(idTask,ongoingData).success(function(taskRes){
            });
        }

        for(var i in done){
            var idTask = todo[i].idtask;
            KanbanService.UpdateStateTask(idTask,doneData).success(function(taskRes){
            });
        }


    }, true);

});