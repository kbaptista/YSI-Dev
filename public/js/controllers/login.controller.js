angular.module('LoginCtrl',[]).controller('LoginController', function($scope,AuthenticationService, $location, $route) {
    $scope.user = {
        name: '',
        password: ''
    };

    $scope.login = function(){
        AuthenticationService.login($scope.user).then(function(msg){
        $location.path('/home');
        $route.reload();
        }, function(error){
            console.log(error);
        });
    }
});