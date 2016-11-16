angular.module('MemberCtrl',[ 'angularUtils.directives.dirPagination']).controller('MemberController', function($route,$rootScope,$scope, UserService, ProjectService, AuthenticationService) {
    $scope.projectName = ProjectService.getName();
    $scope.sortKey = 'name';
    var id_project = $rootScope.projectId;
    getProject();

    $scope.sort = function (keyname) {
        $scope.sortKey = keyname;
        $scope.reverse = !$scope.reverse;
    };

    $scope.model = {};
    $scope.model.selectedOccurence ='';
    $scope.errorMessage = '';

    $scope.addUserProject = function(){
        var userFind = {
            find:false,
            email: ''
        };
        if(AuthenticationService.isAuthenticated()){
            $scope.projects.developpers.forEach(function(element){ /* check if user is already in the project */
                if(element.email == $scope.model.selectedOccurence.email){
                    userFind.find = true;
                    userFind.email = element.email;
                    return;
                }
            });
            if(!userFind.find) {
                ProjectService.addUserToProject(id_project, $scope.model.selectedOccurence).success(function (project) {
                        $scope.projects = project;
                        getProject();
                        $route.reload();
                    })
                    .error(function (status, data) {
                        console.log('status error = ' + status);
                        console.log('data error = ' + data);
                    });
            }
            else{
                $scope.errorMessage = 'User whith email : ' + userFind.email + ' is already in the project';
            }
        }
    };

    if(AuthenticationService.isAuthenticated()){
        UserService.getAllUsers().success(function(allUsers){
                $scope.users = allUsers;
            })
            .error(function(status,data){
                console.log('status error = ' + status);
                console.log('data error = ' + data);
            });
    }

    function getProject() {
        if (AuthenticationService.isAuthenticated()) {
            ProjectService.getProjectById(id_project).success(function (project) {
                    $scope.projects = project;
                })
                .error(function (status, data) {
                    console.log('status error = ' + status);
                    console.log('data error = ' + data);
                });
        }
    }
});