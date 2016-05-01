'use strict';

angular
    .module('students', [
        'ngAnimate',
        'ngResource',
        'ngRoute',
        'LocalStorageModule'
    ])
    .config(['localStorageServiceProvider', function(localStorageServiceProvider) {
        localStorageServiceProvider.setPrefix('ls');
    }])
    .config(function($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/main.html',
                controller: 'MainCtrl',
                controllerAs: 'main'
            })
            .otherwise({
                redirectTo: '/'
            });
    });
