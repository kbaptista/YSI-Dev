angular.module('LoginCtrl',[]).controller('LoginController',['$scope','$location','UserService', 'AuthenticationService', function($scope,$location, UserService, AuthenticationService){
    /*$scope.login = function(){
        var encodedString = '';

        if($scope.input.email !== undefined && $scope.input.password !== undefined)
            encodedString += 'email=' + encodeURIComponent($scope.input.email);
            encodedString += '&password=' + encodeURIComponent($scope.input.password);

        $http({
            method: 'POST',
            url: 'http://localhost:3000/login',
            data: encodedString,
            headers: {'Content-Type' : 'application/x-www-form-urlencoded'}
        })
            .success(function(data,status,headers,config){
                $location.url('/home');
                console.log(data);
            })

            .error(function(data,status,headers,config){
                console.log('unable to post login form');
            });
    };*/


    $scope.login = function login(email,password){
        console.log('clicked!');
        if(email !== undefined && password !== undefined){
            UserService.logIn(email,password).success(function(data){
                AuthenticationService.isLogged = true;
                $location.path('/home');
            }).error(function(status,data){
                console.log('status error = ' + status);
                console.log('data error = ' + data);
            });
        }
    }


}]);