angular.module('KanbanCtrl',['dndLists']).controller('KanbanController', function($routeParams, $rootScope, $scope, ProjectService, SprintService, KanbanService, UsService) {
    function setDisplayMenu() {
        $rootScope.displayProjectMenu = true;
    }
    var project_id = $rootScope.projectId;
    var usCurrentSprint = [];
    var sprintId = SprintService.getSprintId();

    SprintService.getUsFromSprint(sprintId).success(function(us) {
        us.forEach(function(element){
            usCurrentSprint = usCurrentSprint.concat(element.tasks);
        });
        $scope.tasks = usCurrentSprint;

        for (var i = 0; i < usCurrentSprint.length; ++i) {
            if(usCurrentSprint[i].state=="todo")
                $scope.models.lists.TODO.push({name: usCurrentSprint[i].name, idtask: usCurrentSprint[i]._id, idUS: usCurrentSprint[i].idUs, developper: usCurrentSprint[i].developper, usName: usCurrentSprint[i].usName});
            if(usCurrentSprint[i].state=="ongoing")
                $scope.models.lists.ONGOING.push({name: usCurrentSprint[i].name, idtask: usCurrentSprint[i]._id, idUS: usCurrentSprint[i].idUs, developper: usCurrentSprint[i].developper,usName: usCurrentSprint[i].usName});
            if(usCurrentSprint[i].state=="done")
                $scope.models.lists.DONE.push({name: usCurrentSprint[i].name, idtask: usCurrentSprint[i]._id, idUS: usCurrentSprint[i].idUs, developper: usCurrentSprint[i].developper,usName: usCurrentSprint[i].usName});
        }
    });

    setDisplayMenu();
    $scope.projectName = ProjectService.getName();
    $scope.sprintName = $routeParams.name;
    $scope.models = {
        selected: null,
        lists: {"TODO": [], "ONGOING": [], "DONE": []}
    };

    // watch the change on Kanban and save it
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

        /* calculate the effort of each US Done here (<=> each task of the US DONE) */
        /*SprintService.getUsFromSprint(sprintId).success(function(usRes){
            for(var i = 0; i < usRes.length; ++i){
                var tmp = 0;
                var tabTasks = usRes[i].tasks;
                UsService.getTasksFromUs(usRes[i]._id).success(function(tasksRes){
                    for(var j = 0; j < tasksRes.length; ++j) {
                        if (tasksRes[j].state.localeCompare('done') == 0) {
                            ++tmp;
                            var id = tasksRes[j].idUs;
                        }
                    }


                    if(tmp == tabTasks.length){
                        var data = JSON.stringify({
                            state: 'done'
                        });
                        console.log('all tasks done');
                        /*UsService.updateUserStory(id,data).success(function(usNewState){
                            var data = JSON.stringify({
                               effortDone: usNewState.effort
                            });
                            SprintService.updateSprint(sprintId,data).success(function(sprintRes){

                            })
                        });
                    }
                });
            }
        });*/

        /* Add effort of each US done to the right sprint */
        /*SprintService.getUsFromSprint(sprintId).success(function(usRes){
           for(var i = 0; i < usRes.length; ++i) {
               if (usRes[i].state.localeCompare('done') == 0) {
                   var effort = usRes[i].effort;
                   return;
               }
           }
                   var data = JSON.stringify({
                       effortDone: effort
                   });
                   SprintService.updateSprint(sprintId,data).success(function(sprintRes){

                   });
        }); */

    }, true);

});