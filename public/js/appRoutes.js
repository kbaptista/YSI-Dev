angular.module('appRoutes',[]).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){
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
        });

        //.otherwise({redirectTo : '/home'});

    $locationProvider.html5Mode(true);
}]);