angular.module('appRoutes',[]).config(['$routeProvider', function($routeProvider){
    $routeProvider
        .when('/home', {
            templateUrl: '/YSI-Dev/public/views/home.html'
        })

        .when('/users', {
            templateUrl: '/YSI-Dev/public/views/user.html',
            controller: 'UserController'
        })

        .when('/login', {
            templateUrl: '/YSI-Dev/public/views/login.html',
            controller: 'LoginController'
        })

        .when('/signup', {
            templateUrl : '/YSI-Dev/public/views/signup.html',
            controller: 'RegisterController'
        })

        .when('/project',{
            templateUrl: '/YSI-Dev/public/views/project.html',
            controller: 'ProjectController'
        })

        .when('/project/:id/chart',{
            templateUrl: '/YSI-Dev/public/views/charts.html',
            controller: 'ChartController'
        })

        .when('/project/:id/sprints/:name/kanban',{
            templateUrl: '/YSI-Dev/public/views/kanban.html',
            controller: 'KanbanController'
        })

        .when('/about',{
            templateUrl: '/YSI-Dev/public/views/about.html'
        })

        .when('/project/:id',{
            templateUrl: '/YSI-Dev/public/views/backlog.html',
            controller: 'UsController'
        })

        .when('/project/:id/members',{
            templateUrl: '/YSI-Dev/public/views/members.html',
            controller: 'MemberController'
        })

        .when('/userStories/:id',{
            templateUrl: '/YSI-Dev/public/views/backlog.html',
            controller: 'UsController'
        })

        .when('/project/:id/sprints',{
            templateUrl: '/YSI-Dev/public/views/sprint.html',
            controller: 'SprintController'
        })

        .when('/project/:id/sprints/:sprintName', {
            templateUrl: '/YSI-Dev/public/views/sprintDetails.html',
            controller: 'SprintDetailsController'
        })

        .otherwise({redirectTo : '/home'});

}]);