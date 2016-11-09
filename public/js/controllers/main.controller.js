angular.module('MainCtrl',[]).controller('MainController',function($scope, AuthenticationService){
    var username;
    $scope.isLogeedIn = AuthenticationService.isAuthenticated();
    if(AuthenticationService.isAuthenticated()) {
        AuthenticationService.username().success(function (data) {
            username = data.name;
            $scope.name = username;
            })
            .error(function (err) {
                console.log('unable to load /getName ' + err);
            });
    }


    console.log(AuthenticationService.isAuthenticated());

    $scope.logout = function(){
        AuthenticationService.logout();
    }


});