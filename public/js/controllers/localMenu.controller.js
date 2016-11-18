angular.module('LocalMenuCtrl',[]).controller('LocalMenuController', function() {
    console.log('-> LocalMenu controller');

})
    .directive('localMenu', function(){
        return {
            scope: {
              projectId: '@'
            },
            templateUrl: '/YSI-Dev/public/views/partials/localMenu.html'
        };
    });