angular.module('RegisterCtrl',[]).controller('RegisterController', function(AuthenticationService, $location, $scope, $rootScope){
    $scope.user = {
        email: '',
        name: '',
        password: ''
    };
    $rootScope.emailAlreadyExists = '';

    $scope.signup = function(){
        AuthenticationService.register($scope.user).then(function(msg){
            $location.path('/login');
        }, function(err){
            console.log(err);
        })
    }
});