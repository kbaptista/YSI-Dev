angular.module('SprDetailsCtrl',[]).controller('SprintDetailsController', function($rootScope,$scope, SprintService){
    function setDisplayMenu() {
        $rootScope.displayProjectMenu = true;
    }
    setDisplayMenu();

    var sprintId;
    var usSprint = [];
    var allSprints;;

    $scope.usSprints = [];

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
});