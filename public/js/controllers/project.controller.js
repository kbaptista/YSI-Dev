angular.module('ProjectCtrl',[]).controller('ProjectController',function($scope,$location, ProjectService,$route, AuthenticationService, $rootScope, SprintService){

    var currentUser = {
        id: '',
        name: '',
        email:'',
        password:'',
        idProjects: []
    };

    var sprint = {
        name:'',
        startDate: '',
        deadLine: '',
        idProject: ''
    };

    AuthenticationService.userConnected().success(function(user){
        currentUser = user;
        if(AuthenticationService.isAuthenticated()) {
            ProjectService.getProjects().success(function (allProjects) {
                    var userProjecs = []; /* display only project if current is a developper of a project or the product Owner */
                    allProjects.forEach(function(elemProject){
                        elemProject.developpers.forEach(function(elemDev){
                            if(elemDev.email.localeCompare(currentUser.email) == 0){
                                userProjecs.push(elemProject);
                            }
                        });
                        if(elemProject.productOwner.email.localeCompare(currentUser.email) == 0){
                            userProjecs.push(elemProject);
                        }
                    });
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
        if(name !== undefined && desc !== undefined && nbSprint !== undefined && start !== undefined && duration !== undefined && isPrivate !== undefined){
            ProjectService.createProject(name,desc,nbSprint,start,duration, isPrivate, currentUser).success(function(project){
                    /* Create Sprints of the project HERE
                    ** Format Dates with momentjs and save sprint in the DB */
                    var referenceStartDate = moment(project.startDate);
                    var formatEndDate = moment(referenceStartDate);

                    for(var i = 0; i < project.nbSprint; ++i){
                        referenceStartDate.add(7*i,'days');
                        formatEndDate.add(7 * project.dureeSprint, 'days');
                        sprint = {
                            name: i,
                            startDate: referenceStartDate.toString(),
                            deadLine: formatEndDate.toString(),
                            idProject: project._id
                        };
                        SprintService.createSprint(sprint);
                        referenceStartDate.subtract(7*i,'days');
                    }

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
