angular.module('UsCtrl',[]).controller('UsController', function($scope,$location, UsService,$route,$routeParams, $rootScope, ProjectService){
    var id_project = $routeParams.id;
    $rootScope.displayProjectMenu = true;

    $scope.projectName = ProjectService.getName();

    UsService.getUs(id_project).success(function(data){
        $scope.userStories = data;
    })
        .error(function(status,data){
            console.log('status error = ' + status);
            console.log('data error = ' + data);
        });

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

    $scope.editUserStory = function (id) {
        console.log(id);
        UsService.editUserStory(id).success(function (response) {
            $scope.UserStory = response;
        });
    };

    $scope.updateUserStory = function (name,desc,effort,priority){
        if(name !== undefined && desc !== undefined && effort !== undefined && priority !== undefined)
            UsService.updateUserStory(name,desc,effort,priority).success(function(data){
                console.log(name);
            })
                .error(function(status,data){
                    console.log('status error = ' + status);
                    console.log('data error = ' + data);
                });
    };

});
