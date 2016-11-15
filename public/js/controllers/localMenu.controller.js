angular.module('LocalMenuCtrl',[]).controller('LocalMenuController', function($scope, ProjectService, $rootScope) {
    console.log('-> LocalMenu controller');
    /*$scope.projectId = '';
    $scope.projectId = $rootScope.projectId;*/

    //$scope.projectId = '1234';
})
    .directive('localMenu', function($rootScope){
        return {
            templateUrl: '/YSI-Dev/public/views/partials/localMenu.html',
            link: function(scope, element, attributes){
                scope.projectId = $rootScope.projectId;
            }
        };
    });