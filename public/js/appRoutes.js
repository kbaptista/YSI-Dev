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

        .when('/charts',{
            templateUrl: '/YSI-Dev/public/views/charts.html',
            controller: 'ChartsController'
        })

        .when('/team',{
            templateUrl: '/YSI-Dev/public/views/team.html',
            controller: 'TeamController'
        })

        .when('/about',{
            templateUrl: '/YSI-Dev/public/views/about.html'
        })

        .when('/project/:id',{
            templateUrl: '/YSI-Dev/public/views/backlog.html',
            controller: 'UsController'
        })


        .otherwise({redirectTo : '/home'});

}]);