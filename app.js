(
    function () {
        'use strict';
    
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
            .otherwise({ redirectTo: '/' });
        }    

        app.controller('dashboardController', function ($rootScope, $scope, $http, $location) {
            console.log('dashboard')
        })

        app.controller('playerController', function ($rootScope, $scope, $http, $location) {
            console.log('player')
        })

    }
)();