angular.module('RegisterCtrl',[]).controller('RegisterController', function(AuthenticationService, $location, $scope){
    $scope.user = {
        name: '',
        password: ''
    };

    $scope.signup = function(){
        AuthenticationService.register($scope.user).then(function(msg){
            $location.path('/login');
        }, function(err){
            console.log(err);
        })
    }
});