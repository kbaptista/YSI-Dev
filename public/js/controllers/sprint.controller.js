angular.module('SprCtrl',[]).controller('SprintController', function($rootScope,$scope,$location, SprintService,ProjectService,$route,$routeParams){
    var project_id = $rootScope.projectId;

    $scope.projectName = ProjectService.getName();
    var formatSprints = [];
    var sprint = {
        id:'',
        startDate: '',
        endDate: ''
    };

    ProjectService.getProjectById(project_id).success(function(project){
        /* Format Dates with momentjs and create an array with start date and end date of the sprint */
        var referenceStartDate = moment(project.startDate);
        var formatEndDate = moment(referenceStartDate);

        for(var i = 0; i < project.nbSprint; ++i){
            referenceStartDate.add(7*i,'days');
            formatEndDate.add(7 * project.dureeSprint, 'days');
            sprint = {
                id: i,
                startDate: referenceStartDate.format('DD MM YYYY'),
                endDate: formatEndDate.format('DD MM YYYY')
            };
            formatSprints.push(sprint);
            referenceStartDate.subtract(7*i,'days');
        }
        $scope.sprints = formatSprints;
        console.log($scope.sprints);
    });



    /* var id_project = $routeParams.id;
     var sprintById = {};
     var projectNbSprint = [];
     $scope.displayProjectMenu == true;

     $scope.projectName = ProjectService.getName();

     $scope.getSprintById = function (id) {
     SprintService.getSprintById(id).success(function (data) {
     $scope.sprintById = data;
     })
     .error(function(status,data){
     console.log('status error = ' + status);
     console.log('data error = ' + data);
     });
     };

     $scope.SprintFromProject = function(id_project){
     SprintService.SprintFromProject(id_project).success(function (data) {
     $scope.sprints = data;
     })
     .error(function (status, data) {
     console.log('status error = ' + status);
     console.log('data error = ' + data);
     });
     };

     $scope.CountSprintFromProject= function(id_project){
     SprintService.SprintFromProject(id_project).success(function (count) {
     for(var i = 1;i <= count; ++i){
     projectNbSprint.push(i);
     }
     })
     .error(function (status, projectNbSprint) {
     console.log('status error = ' + status);
     console.log('data error = ' + projectNbSprint);
     });
     };

     $scope.createSprint = function createSprint(name,startDate,deadLine,id_project){
     if(name !== undefined && startDate !== undefined && deadLine !== undefined && id_project !== undefined){
     SprintService.createSprint(name,startDate,deadLine,id_project).success(function(data){
     $route.reload();
     })
     .error(function(status,data){
     console.log('status error = ' + status);
     console.log('data error = ' + data);
     });
     }
     };

     $scope.removeSprint = function (id) {
     console.log(id);
     SprintService.removeSprint(id).success(function () {
     $route.reload();
     });
     };*/

});

