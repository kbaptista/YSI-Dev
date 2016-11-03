angular.module('UserCtrl',[]).controller('UserController', function($scope, User){
    $scope.users = User.query();
    console.log($scope.users);
});