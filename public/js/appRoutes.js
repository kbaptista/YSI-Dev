angular.module('appRoutes',[]).config(['$routeProvider', function($routeProvider){
    $routeProvider
        .when('/home', {
            templateUrl: '/YSI-Dev/public/views/home.html',
            controller : 'MainController'
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

        .otherwise({redirectTo : '/home'});

}]);