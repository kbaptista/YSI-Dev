angular.module('MemberCtrl',[]).controller('MemberController', function($scope, ProjectService) {
    $scope.projectName = ProjectService.getName();
});