angular.module('LocalMenuCtrl',[]).controller('LocalMenuController', function($scope, ProjectService) {
    $scope.projectId = ProjectService.getId();
});