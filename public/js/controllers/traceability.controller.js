angular.module('traceabilityCtrl',[]).controller('traceabilityController', function($scope,$location, UsService,$route,$routeParams, $rootScope, ProjectService, traceabilityService, AuthenticationService) {

    function setDisplayMenu() {
        $rootScope.displayProjectMenu = true;
    }
    function setProjectName(){
        $scope.projectName = ProjectService.getName();
    }

    setDisplayMenu();
    setProjectName();

    $scope.$on('$routeChangeSuccess',setDisplayMenu);
    $scope.$on('$routeUpdate',setProjectName);

    var id_project = $routeParams.id;

    $rootScope.projectId = id_project;
    $scope.UserStory = {};

    if(AuthenticationService.isAuthenticated()) {
        UsService.getUs(id_project).success(function (data) {
            $scope.userStories = data;
        })
            .error(function (status, data) {
                console.log('status error = ' + status);
                console.log('data error = ' + data);
            });
    }

    $scope.getUserStory = function (id) {
        UsService.getUserStory(id).success(function (data) {
            $scope.UserStory = data;
        })
            .error(function(status,data){
                console.log('status error = ' + status);
                console.log('data error = ' + data);
            });
    };

    $scope.AddCommitToUs = function (){
        traceabilityService.AddCommitToUs($scope.UserStory._id, $scope.commit).success(function(data){
            $route.reload();
            $('#modalAddCommit').modal('hide');
        })
            .error(function(status,data){
                console.log('status error = ' + status);
                console.log('data error = ' + data);
            });
    };
});