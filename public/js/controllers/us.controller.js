angular.module('UsCtrl',[]).controller('UsController', function($scope,$location, UsService,$route,$routeParams){
var id_project = $routeParams.id;

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
    }
});
