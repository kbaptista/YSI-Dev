angular.module('ProjectCtrl',[]).controller('ProjectController',function($scope,$location, ProjectService,$route, AuthenticationService, $rootScope){

    console.log('-> project controller');
    var currentUser = {
        id: '',
        name: '',
        email:'',
        password:'',
        idProjects: []
    };

    AuthenticationService.userConnected().success(function(user){
        currentUser = user;
        console.log(currentUser.email);
        if(AuthenticationService.isAuthenticated()) {
            ProjectService.getProjects().success(function (allProjects) {
                    var userProjecs = []; /* display only project if current is a developper of a project or the product Owner */
                    allProjects.forEach(function(elemProject){
                        elemProject.developpers.forEach(function(elemDev){
                            if(elemDev.email.localeCompare(currentUser.email) == 0){
                                userProjecs.push(elemProject);
                                console.log(elemDev.email.localeCompare(currentUser.email));
                            }
                        });
                        if(elemProject.productOwner.email.localeCompare(currentUser.email) == 0){
                            userProjecs.push(elemProject);
                        }
                    });
                    console.log(userProjecs);
                    $scope.projects = userProjecs;
                })
                .error(function (status, data) {
                    console.log('status error = ' + status);
                    console.log('data error = ' + data);
                });
        }
    });

    $scope.setProjectDatas = function(projectName, projectId){
        ProjectService.setName(projectName);
        ProjectService.setId(projectId);
        $rootScope.projectId = projectId;
    };


    if(!AuthenticationService.isAuthenticated()){
        ProjectService.getPublicProjects().success(function(publicProjects){
                $scope.projects = publicProjects;
            })
            .error(function(status,data){
                console.log('status error = ' + status);
                console.log('data error = ' + data);
            });
    }



    $scope.createProject = function createProject(name,desc,nbSprint,start,duration, isPrivate){ /* by default, Product Owner = Scrum Master = Current User */
        console.log(isPrivate);
        if(name !== undefined && desc !== undefined && nbSprint !== undefined && start !== undefined && duration !== undefined && isPrivate !== undefined){
            ProjectService.createProject(name,desc,nbSprint,start,duration, isPrivate, currentUser).success(function(data){
                    $route.reload();
                    $('#modalCreateProject').modal('hide');
                })
                .error(function(status,data){
                    console.log('status error = ' + status);
                    console.log('data error = ' + data);
                });
        }
    }
});
