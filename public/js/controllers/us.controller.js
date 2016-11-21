angular.module('UsCtrl',[]).controller('UsController', function($scope,$location, UsService,$route,$routeParams, $rootScope, ProjectService, AuthenticationService){
    function setDisplayMenu() {
        $rootScope.displayProjectMenu = true;
    }
    function setProjectName(){
        console.log('reload');
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

    $scope.createUserStories = function createUserStories(name,desc,effort,priority){
        if(name !== undefined && desc !== undefined && effort !== undefined && priority !== undefined){
            UsService.createUserStories(name,desc,effort,priority,id_project).success(function(data){
                    $route.reload();
                    $('#modalCreateUserStory').modal('hide');
                })
                .error(function(status,data){
                    console.log('status error = ' + status);
                    console.log('data error = ' + data);
                });
        }
    };

    $scope.removeUserStory = function (id) {
        console.log(id);
        UsService.removeUserStory(id).success(function () {
            $route.reload();
        });
    };

    $scope.getUserStory = function (id) {
        UsService.getUserStory(id).success(function (data) {
                $scope.UserStory = data;
            })
            .error(function(status,data){
                console.log('status error = ' + status);
                console.log('data error = ' + data);
            });
    };

    $scope.updateUserStory = function (){
        UsService.updateUserStory($scope.UserStory._id, $scope.UserStory).success(function(data){
            $route.reload();
                $('#modalUpdateUserStory').modal('hide');
            })
            .error(function(status,data){
                console.log('status error = ' + status);
                console.log('data error = ' + data);
            });
    };

});
