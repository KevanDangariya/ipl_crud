(
    function () {
        'use strict';

        const BACKEND_URL = "http://localhost:8000";
    
        var app = angular.module('ipl', ['ngRoute']).config(config);
    
        // app.run(function ($rootScope, $location, $http) {
        //     $rootScope.logout = function() {
        //         console.log('logout');
        //         var token = JSON.parse(localStorage.getItem('user'));
        //         localStorage.removeItem('user');

        //         $http.post('http://localhost:8000' + '/api/logout',
        //         {
        //             access_token: token.data.access_token
        //         }).then(function successCallback(response) {
                    
        //             console.log(response.data);
        //             // return;
        //             $location.path('/login');
                    
        //         },function errorCallback(response){
        //             console.log(response);
        //             $('.error').html('Wrong Credentials');
        //             return;
        //         });
                
        //         console.log('after logout');
        //     };            
            
        //     console.log('in run function');
        //     if (localStorage.user === undefined) {
        //         $location.path('/login');
        //     }
        //     else {
        //         const userObj = JSON.parse(localStorage.user)
        //         $rootScope.user = {
        //             'user_id': userObj.data.id,
        //             'user_name': userObj.data.name,
        //             'user_email': userObj.data.email
        //         }
        //         console.log($rootScope.user);
        //         var location = window.location.href;
        //         var loc = location.split('!/')
        //         console.log(loc[1]);
        //         $location.path('/'+loc[1])

        //     }
        // });

        config.$inject = ['$routeProvider', '$locationProvider'];
        function config($routeProvider, $locationProvider) {
            $routeProvider
            .when('/', {
                controller: 'dashboardController',
                templateUrl: 'views/dashboard/dashboard.html'
            })
            .when('/player', {
                controller: 'playerController',
                templateUrl: 'views/player/player.html'
            })
            .when('/player/create', {
                controller: 'createPlayerController',
                templateUrl: 'views/player/create.html'
            })
            .when('/player/edit/:id', {
                controller: 'editPlayerController',
                templateUrl: 'views/player/create.html'
            })
            .otherwise({ redirectTo: '/' });
        }    

        app.controller('dashboardController', function ($rootScope, $scope, $http, $location) {
            $http.get(BACKEND_URL + '/api/player', {})
            .then(function successCallback(response) {
                console.log(response.data);
            },function errorCallback(response){
                console.log(response.data);
            });
        })

        app.controller('playerController', function ($rootScope, $scope, $http, $location) {
            console.log('player')
        })

        app.controller('createPlayerController', function ($rootScope, $scope, $http, $location) {
            console.log('create player')
        })

        app.controller('editPlayerController', function ($rootScope, $scope, $http, $location) {
            console.log('edit player')
        })

    }
)();