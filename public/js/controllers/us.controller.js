angular.module('UsCtrl',[]).controller('UsController',['$scope','$location', 'UsService','$route', function($scope,$location, UsService,$route){

    $scope.createUs = function createUs(desc,effort,priority){
        if(desc !== undefined && effort !== undefined && priority !== undefined){
            UsService.createUs(desc,effort,priority).success(function(data){
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
