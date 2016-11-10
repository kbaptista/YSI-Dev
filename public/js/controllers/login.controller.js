angular.module('LoginCtrl',[]).controller('LoginController', function($scope,AuthenticationService, $location, $window, $rootScope) {
    $scope.user = {
        email:'',
        password: ''
    };

    $rootScope.authenticationFailed = '';

    $scope.login = function(){
        AuthenticationService.login($scope.user).then(function(msg){
        $location.path('/home');
        $window.location.reload();
        }, function(error){
            console.log(error);
        });
    }
});