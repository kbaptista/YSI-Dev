angular.module('MainCtrl',[]).controller('MainController',function($scope, AuthenticationService, $location, $rootScope){
    $rootScope.displayProjectMenu = false;
    console.log('-> MainController');

    $scope.isActive = function(viewLocation){
        return viewLocation == $location.path();
    };


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