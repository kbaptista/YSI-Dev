angular.module('LocalMenuCtrl',[]).controller('LocalMenuController', function($scope, ProjectService) {
    console.log('-> LocalMenu controller');

    //$scope.projectId = ProjectService.getId();
    //console.log('LocalMenuController = ' + $scope.projectId);
})
    .directive('localMenu', function(){
        return {
            scope: {
              projectId: '@'
            },
            templateUrl: '/YSI-Dev/public/views/partials/localMenu.html'
        };
    });