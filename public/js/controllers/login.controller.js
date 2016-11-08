angular.module('LoginCtrl',[]).controller('LoginController', function($scope,AuthenticationService, $location) {
    $scope.user = {
        name: '',
        password: ''
    };

    $scope.login = function(){
        AuthenticationService.login($scope.user).then(function(msg){
        $location.path('/about');
        }, function(error){
            console.log(error);
        });
    }
});