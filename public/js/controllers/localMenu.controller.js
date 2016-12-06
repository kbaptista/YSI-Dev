angular.module('LocalMenuCtrl',[]).controller('LocalMenuController', function() {

})
    .directive('localMenu', function(){
        return {
            scope: {
              projectId: '@'
            },
            templateUrl: '/YSI-Dev/public/views/partials/localMenu.html'
        };
    });