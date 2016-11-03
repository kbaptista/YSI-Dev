angular.module('RegisterCtrl',[]).controller('RegisterController', function($http,$scope){
    $scope.postForm = function(){
        var encodedString = '';
        if($scope.input.email){
            encodedString += 'email=' + encodeURIComponent($scope.input.email);
        }
        if($scope.input.name){
            encodedString += '&name=' + encodeURIComponent($scope.input.name);
        }
        if($scope.input.password){
            encodedString += '&password=' + encodeURIComponent($scope.input.password);
        }
        /*encodedString = 'email=' + encodeURIComponent($scope.input.email) + '&name=' + encodeURIComponent($scope.input.name) +
                '&password=' + encodeURIComponent($scope.input.password);*/

        $http({
            method: 'POST',
            url: 'http://localhost:3000/signup',
            data: encodedString,
            headers : {'Content-Type' : 'application/x-www-form-urlencoded'}
        })
            .success(function(data,status,headers,config){
                
            })
            .error(function(data,status,headers,config){
                console.log('unable to submit the form');
            });
    };
});