angular.module('UsCtrl',[]).controller('UsController',['$scope','$location', 'UsService','$route', function($scope,$location, UsService,$route){

    UsService.getUs().success(function(data){
        $scope.userStories = data;
    })
        .error(function(status,data){
            console.log('status error = ' + status);
            console.log('data error = ' + data);
        });


    $scope.createUserStories = function createUserStories(name,desc,effort,priority){
        console.log(name);
        if(name !== undefined && desc !== undefined && effort !== undefined && priority !== undefined){
            UsService.createUserStories(name,desc,effort,priority).success(function(data){
                $route.reload();
                $('#modalCreateUserStory').modal('hide');
            })
                .error(function(status,data){
                    console.log('status error = ' + status);
                    console.log('data error = ' + data);
                });
        }
    }
}]);
