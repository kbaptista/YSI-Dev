angular.module('MainCtrl',[]).controller('MainController',function($scope, AuthenticationService, $location, $rootScope, ProjectService, $routeParams){
    $rootScope.displayProjectMenu = false;

    if(AuthenticationService.isAuthenticated()) {
        AuthenticationService.username().success(function (data) {
            $scope.name = data.name;
            })
            .error(function (err) {
                console.log('unable to load /getName ' + err);
            });
    }

    $scope.isAuthenticated = function(){
        return AuthenticationService.isAuthenticated();
    };

    $scope.logout = function(){
        AuthenticationService.logout();
        $location.path('/home');
    }


});