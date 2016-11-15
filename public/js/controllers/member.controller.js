angular.module('MemberCtrl',[]).controller('MemberController', function($scope, ProjectService) {
    $scope.displayProjectMenu == true;

    $scope.projectName = ProjectService.getName();
});