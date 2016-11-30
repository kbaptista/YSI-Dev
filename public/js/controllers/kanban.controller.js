angular.module('KanbanCtrl',['dndLists']).controller('KanbanController', function($routeParams, $rootScope, $scope, ProjectService, SprintService, KanbanService, UsService) {
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
                $scope.models.lists.TODO.push({name: usCurrentSprint[i].name, idtask: usCurrentSprint[i]._id, idUS: usCurrentSprint[i].idUs});
            if(usCurrentSprint[i].state=="ongoing")
                $scope.models.lists.ONGOING.push({name: usCurrentSprint[i].name, idtask: usCurrentSprint[i]._id, idUS: usCurrentSprint[i].idUs});
            if(usCurrentSprint[i].state=="done")
                $scope.models.lists.DONE.push({name: usCurrentSprint[i].name, idtask: usCurrentSprint[i]._id, idUS: usCurrentSprint[i].idUs});
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
        //  console.log(model);
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

        var idTask;
        var idUs;
        for(var i in todo){
            idTask = todo[i].idtask;
            idUs = todo[i].idUS;
            KanbanService.UpdateStateTask(idTask,todoData).success(function(taskRes){
                var dataTask = JSON.stringify({
                    tasks : {
                        name: taskRes.name,
                        description: taskRes.description,
                        idUs: taskRes.idUs,
                        usName: taskRes.usName,
                        state: 'todo',
                        _id: taskRes._id
                    }
                });
                console.log(taskRes);
                UsService.updateUserStory(idUs,dataTask).success(function(usRes){ // update US to update the reference in the sprint

                });
            });
        }

        for(var j in ongoing){
            idTask = ongoing[j].idtask;
            idUs = ongoing[j].idUS;
            KanbanService.UpdateStateTask(idTask,ongoingData).success(function(taskRes){
                var dataTask = JSON.stringify({
                    tasks : {
                        name: taskRes.name,
                        description: taskRes.description,
                        idUs: taskRes.idUs,
                        usName: taskRes.usName,
                        state: 'ongoing',
                        _id: taskRes._id
                    }
                });
                UsService.updateUserStory(idUs,dataTask).success(function(usRes){

                });
            });
        }

        for(var h in done){
            idTask = done[h].idtask;
            idUs = done[h].idUS;
            KanbanService.UpdateStateTask(idTask,doneData).success(function(taskRes){
                var dataTask = JSON.stringify({
                    tasks : {
                        name: taskRes.name,
                        description: taskRes.description,
                        idUs: taskRes.idUs,
                        usName: taskRes.usName,
                        state: 'done',
                        _id: taskRes._id
                    }
                });
                UsService.updateUserStory(idUs,dataTask).success(function(usRes){

                });
            });
        }

    }, true);

});