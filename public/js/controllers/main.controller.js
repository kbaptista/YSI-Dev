angular.module('MainCtrl',[]).controller('MainController',function($scope, AuthenticationService, $location, $rootScope){
    function setDisplayMenu() {
        $rootScope.displayProjectMenu = false;
    }
    setDisplayMenu();

    $scope.$on('$routeChangeSuccess',setDisplayMenu);

    console.log('-> MainController');

    $scope.isActive = function(viewLocation){
        return viewLocation == $location.path();
    };


    if(AuthenticationService.isAuthenticated()) {
        AuthenticationService.userConnected().success(function (data) {
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