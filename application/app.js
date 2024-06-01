(
    function () {
        'use strict';

        const BACKEND_URL = "http://localhost:8000";
    
        var app = angular.module('ipl', ['ngRoute','ui.select2']).config(config);
    
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
            .when('/playerType', {
                controller: 'playerTypeController',
                templateUrl: 'views/playerType/playerType.html'
            })
            .when('/playerType/create', {
                controller: 'createPlayerTypeController',
                templateUrl: 'views/playerType/create.html'
            })
            .when('/playerType/edit/:id', {
                controller: 'editPlayerTypeController',
                templateUrl: 'views/playerType/create.html'
            })
            .when('/team', {
                controller: 'teamController',
                templateUrl: 'views/team/team.html'
            })
            .when('/team/create', {
                controller: 'createTeamController',
                templateUrl: 'views/team/create.html'
            })
            .when('/team/edit/:id', {
                controller: 'editTeamController',
                templateUrl: 'views/team/create.html'
            })
            .otherwise({ redirectTo: '/' });
        }    

        app.directive('fileInput', ['$parse', function ($parse) {
            return {
                restrict: 'A',
                link: function (scope, element, attrs) {
                    element.bind('change', function () {
                        $parse(attrs.fileInput)
                            .assign(scope, element[0].files[0]);
                        scope.$apply();
                        // Update the image preview
                        var reader = new FileReader();
                        reader.onload = function(e) {
                            scope.$apply(function() {
                                scope.player.imagePreview = e.target.result;
                                delete scope.isEdit;
                            });
                        };
                        reader.readAsDataURL(element[0].files[0]);
                    });
                }
            };
        }]);        

        app.controller('dashboardController', function ($rootScope, $scope, $http, $location) {
            $http.get(BACKEND_URL + '/api/getDashboard', {})
            .then(function successCallback(response) {
                $scope.dashboard = response.data.data;
            },function errorCallback(response){
                var err = response.data.errors;
            });

        })

        app.controller('playerController', function ($rootScope, $scope, $http, $location, $compile) {
            // edit player 
            $scope.edit = function(id) {
                $http.get(BACKEND_URL + '/api/getPlayerById/' + id , {})
                .then(function successCallback(response) {
                    $location.path('/player/edit/'+id);
                    $scope.player = response.data.data;
                },function errorCallback(response){
                    var err = response.data.errors;
                });
            }

            // delete player 
            $scope.delete = function(id) {

                $http.post(BACKEND_URL + '/api/deletePlayerById/' + id, {
                    data: id
                }).then(function successCallback(response) {
                    getPlayer();                    
                },function errorCallback(response){
                    $('.error').html('Wrong Credentials');
                    return;
                }) 
            }

            function buildDataTable(data) {
                $('#table-view').DataTable().destroy();
                $('#table-view').DataTable({
                    ordering: true,
                    data: data,
                    searching: true,
                    columns: [
                        {'data':'id'},
                        {   
                            'data':'image',
                            'className': "image_center",
                            render: function (data) {
                                return data != null ? '<img src="../server/public/storage/uploads/'+ data + '" width="60" style="border-radius: 8px;" >' : '<img src="./assets/images/demoperson.jpg" width="60" >';
                            }
                        },
                        {'data':'name'},
                        {'data':'team_name'},
                        {'data':'type_name'},
                        {
                            'data':'status',
                            render: function (data) {
                                return data == 0 ? '<span class=" status bg-success text-white">Active</span>' : '<span class="status bg-danger text-white">Inactive</span>';
                            }
                        },
                        {
                            'data': 'id', 
                            render: function(data, type) {
                                return type == 'display'
                                ? '<i class="fas fa-edit" ng-click="edit('+data+')"></i>'
                                : data  
                            }
                        },
                        {
                            'data': 'id', 
                            render: function(data, type) {
                                return type == 'display'
                                ? '<i class="fa fa-trash" ng-click="delete('+data+')" aria-hidden="true"></i>'
                                : data  
                            }
                        }
                    ],
                    rowCallback: function(row) {    
                        if (!row.compiled) {
                            $compile(angular.element(row))($scope);
                            row.compiled = true;  
                        }
                    }
                });
            }

            function getPlayer() {
                $http.get(BACKEND_URL + '/api/player', {})
                .then(function successCallback(response) {
                    $location.path('/player');
                    buildDataTable(response.data.data);
                },function errorCallback(response){
                    var err = response.data.errors;
                });
            }
            getPlayer();
        })
        
        app.controller('createPlayerController', function ($rootScope, $scope, $http, $location) {
            $scope.isNew = 1;
            $scope.player = {name: '', type_id: '', team_id: '', status: 0, image: null, imagePreview: null};
            
            $scope.loadData = function(dd) {
                $http.get(BACKEND_URL + '/api/' + dd + 'Dropdown')
                .then(function(response) {
                    $('#'+dd).select2({
                        placeholder: 'Select '+dd,
                        allowClear: true
                    }).empty().append(new Option('', '', true, true)).trigger('change');
                    response.data.data.forEach(function(item) {
                        var newOption = new Option(item.name, item.id, false, false);
                        $('#'+dd).append(newOption);
                    });
                    $('#'+dd).val(null).trigger('change');

                });
            };
            $scope.loadData('playerType');
            $scope.loadData('team');
            
            $scope.save = function() {
                $('#name_err').html('');
                $('#team_err').html('');
                $('#type_err').html('');
                $('#image_err').html('');
                $scope.player.type_id = $('#playerType').val();
                $scope.player.team_id = $('#team').val();
                if ($scope.player.status == null) {
                    $('#status_err').html('Please select status.');
                }
                if (!$scope.player.team_id) {
                    $('#team_err').html('Please select team.');
                }
                if (!$scope.player.type_id) {
                    $('#type_err').html('Please select type.');
                }
                if (!$scope.player.name) {
                    $('#name_err').html('Please enter name.');
                }
                if (!$scope.player.image) {
                    $('#image_err').html('Please choose image.');
                }
                if ($scope.player.status != null && $scope.player.type_id && $scope.player.team_id && $scope.player.image != null) {
                    var formData = new FormData();
                    formData.append('name', $scope.player.name);
                    formData.append('type_id', $scope.player.type_id);
                    formData.append('team_id', $scope.player.team_id);
                    formData.append('status', $scope.player.status);
                    formData.append('image', $scope.player.image);
                    $http.post(BACKEND_URL + '/api/createPlayer', formData, {
                        headers: { 'Content-Type': undefined },
                        transformRequest: angular.identity
                    })
                    .then(function successCallback(response) {
                        delete $scope.isNew;
                        $location.path('/player');
                    },function errorCallback(response){
                        var err = response.data.errors;
                        if (err.name) {
                            $('#name_err').html(err.name);                            
                        }
                        if (!$scope.player.team) {
                            $('#team_err').html(err.team);
                        }
                        if (!$scope.player.player_type) {
                            $('#type_err').html(err.type);
                        }
                        if (err.status) {
                            $('#status_err').html(err.status);                            
                        }
                        if (err.image) {
                            $('#image_err').html(err.image);                            
                        }
                    });
                }
            } 
        })

        app.controller('editPlayerController', function ($rootScope, $scope, $http, $location) {
            var url = $location.absUrl().split('/edit/');
            var id = url[1];
            $scope.isEdit = 1;
            $location.path('/player/edit/'+id);
            $scope.player = {name: '', type_id: '', team_id: '', status: 0, image: null, imagePreview: null};

            $scope.loadData = function(dd) {
                $http.get(BACKEND_URL + '/api/' + dd + 'Dropdown')
                .then(function(response) {
                    $('#'+dd).select2({
                        placeholder: 'Select '+dd,
                        allowClear: true
                    }).empty().append(new Option('', '', true, true)).trigger('change');
                    response.data.data.forEach(function(item) {
                        var newOption = new Option(item.name, item.id, false, false);
                        $('#'+dd).append(newOption);
                    });
                    $('#'+dd).val(null).trigger('change');

                });
            };
            $scope.loadData('playerType');
            $scope.loadData('team');

            $http.get(BACKEND_URL + '/api/getPlayerById/' + id , {})
            .then(function successCallback(response) {
                $scope.player = response.data.data[0];
                $scope.player.imagePreview = response.data.data[0].image;
                $('#playerType').val(response.data.data[0].type_id).trigger('change');
                $('#team').val(response.data.data[0].team_id).trigger('change');
                if (response.data.data[0].status == 0) {
                    $scope.player.status = '0';
                } else {
                    $scope.player.status = '1';
                }
            },function errorCallback(response){
                var err = response.data.errors;
            });

            $scope.deletePlayerImage = function () {
                var data = new FormData();
                data.append('image', $scope.player.image);
                if (confirm("Are you sure you want to delete this player image?")) {
                    $http.post(BACKEND_URL + '/api/deleteImage/' + id, data, {
                        headers: { 'Content-Type': undefined },
                        transformRequest: angular.identity
                    })
                    .then(function(response) {
                        $scope.player.image = null;
                        $scope.player.imagePreview = null;
                    }, function(error) {
                        console.log('Error:', error);
                    });
                }
            }

            $scope.save = function() {
                $('#name_err').html('');
                $('#team_err').html('');
                $('#type_err').html('');
                $scope.player.type_id = $('#playerType').val();
                $scope.player.team_id = $('#team').val();
                if ($scope.player.status == null) {
                    $('#status_err').html('Please select status.');
                }
                if (!$scope.player.team_id) {
                    $('#team_err').html('Please select team.');
                }
                if (!$scope.player.type_id) {
                    $('#type_err').html('Please select type.');
                }
                if (!$scope.player.name) {
                    $('#name_err').html('Please enter name.');
                }
                if (!$scope.player.image) {
                    $('#image_err').html('Please choose image.');
                }
                if ($scope.player.image != null && $scope.player.status != null && $scope.player.type_id && $scope.player.team_id) {
                    var formData = new FormData();
                    formData.append('name', $scope.player.name);
                    formData.append('type_id', $scope.player.type_id);
                    formData.append('team_id', $scope.player.team_id);
                    formData.append('status', $scope.player.status);
                    formData.append('image', $scope.player.image);
                    $http.post(BACKEND_URL + '/api/editPlayerById/' + id, formData, {
                        headers: { 'Content-Type': undefined },
                        transformRequest: angular.identity
                    })
                    .then(function successCallback(response) {
                        delete $scope.isEdit;
                        $location.path('/player');
                    },function errorCallback(response){
                        var err = response.data.errors;
                        if (err.name) {
                            $('#name_err').html(err.name);                            
                        }
                        if (!$scope.player.team) {
                            $('#team_err').html(err.team);
                        }
                        if (!$scope.player.type) {
                            $('#type_err').html(err.type);
                        }
                        if (err.status) {
                            $('#status_err').html(err.status);                            
                        }
                        if (err.image) {
                            $('#image_err').html(err.image);                            
                        }
                    });
                }
            }
        })

        app.controller('playerTypeController', function ($rootScope, $scope, $http, $location, $compile) {

            // edit player type
            $scope.edit = function(id) {
                $http.get(BACKEND_URL + '/api/getPlayerTypeById/' + id , {})
                .then(function successCallback(response) {
                    $location.path('/playerType/edit/'+id);
                    $scope.playerType = response.data.data;
                },function errorCallback(response){
                    var err = response.data.errors;
                });
            }

            // delete player type
            $scope.delete = function(id) {

                $http.post(BACKEND_URL + '/api/deletePlayerTypeById/' + id, {
                    data: id
                }).then(function successCallback(response) {
                    getPlayerType();                    
                },function errorCallback(response){
                    $('.error').html('Wrong Credentials');
                    return;
                }) 
            }

            function buildDataTable(data) {
                $('#table-view').DataTable().destroy();
                $('#table-view').DataTable({
                    ordering: true,
                    data: data,
                    searching: true,
                    columns: [
                        {'data':'id'},
                        {'data':'name'},
                        {
                            'data':'status',
                            render: function (data) {
                                return data == 0 ? '<span class=" status bg-success text-white">Active</span>' : '<span class="status bg-danger text-white">Inactive</span>';
                            }
                        },
                        {
                            'data': 'id', 
                            render: function(data, type) {
                                return type == 'display'
                                ? '<i class="fas fa-edit" ng-click="edit('+data+')"></i>'
                                : data  
                            }
                        },
                        {
                            'data': 'id', 
                            render: function(data, type) {
                                return type == 'display'
                                ? '<i class="fa fa-trash" ng-click="delete('+data+')" aria-hidden="true"></i>'
                                : data  
                            }
                        }
                    ],
                    rowCallback: function(row) {    
                        if (!row.compiled) {
                            $compile(angular.element(row))($scope);
                            row.compiled = true;  
                        }
                    }
                });
            }

            function getPlayerType() {
                $http.get(BACKEND_URL + '/api/playerType', {})
                .then(function successCallback(response) {
                    $location.path('/playerType');
                    buildDataTable(response.data.data);
                },function errorCallback(response){
                    var err = response.data.errors;
                });
            }
            getPlayerType();
        })

        app.controller('createPlayerTypeController', function ($rootScope, $scope, $http, $location) {
            $scope.isNew = 1;
            $scope.playerType = {name: '', status: 0};
            $scope.save = function() {
                if ($scope.playerType.status == null) {
                    $('#status_err').html('Please select status.');
                }
                if (!$scope.playerType.name) {
                    $('#name_err').html('Please enter name.');
                }
                else {
                    $('#name_err').html('');

                    $http.post(BACKEND_URL + '/api/createPlayerType', {
                        data: $scope.playerType
                    })
                    .then(function successCallback(response) {
                        delete $scope.isNew;
                        $location.path('/playerType');
                    },function errorCallback(response){
                        var err = response.data.errors;
                        if (err.name) {
                            $('#name_err').html(err.name);                            
                        }
                        if (err.status) {
                            $('#status_err').html(err.status);                            
                        }
                    });
                }
            } 
        })

        app.controller('editPlayerTypeController', function ($rootScope, $scope, $http, $location) {
            var url = $location.absUrl().split('/edit/');
            var id = url[1];
            $http.get(BACKEND_URL + '/api/getPlayerTypeById/' + id , {})
            .then(function successCallback(response) {
                $location.path('/playerType/edit/'+id);
                $scope.playerType = response.data.data[0];
                if (response.data.data[0].status == 0) {
                    $scope.playerType.status = '0';
                } else {
                    $scope.playerType.status = '1';
                }
            },function errorCallback(response){
                var err = response.data.errors;
            });


            $scope.save = function() {
                if ($scope.playerType.status == null) {
                    $('#status_err').html('Please select status.');
                }
                if (!$scope.playerType.name) {
                    $('#name_err').html('Please enter name.');
                }
                else {
                    $('#name_err').html('');

                    $http.post(BACKEND_URL + '/api/editPlayerTypeById/' + id, {
                        data: $scope.playerType
                    })
                    .then(function successCallback(response) {
                        $location.path('/playerType');
                    },function errorCallback(response){
                        var err = response.data.errors;
                        if (err.name) {
                            $('#name_err').html(err.name);                            
                        }
                        if (err.status) {
                            $('#status_err').html(err.status);                            
                        }
                    });
                }
            }
        })

        app.controller('teamController', function ($rootScope, $scope, $http, $location, $compile) {

            // edit team
            $scope.edit = function(id) {
                $http.get(BACKEND_URL + '/api/getTeamById/' + id , {})
                .then(function successCallback(response) {
                    $location.path('/team/edit/'+id);
                    $scope.team = response.data.data;
                },function errorCallback(response){
                    var err = response.data.errors;
                });
            }

            // delete team
            $scope.delete = function(id) {

                $http.post(BACKEND_URL + '/api/deleteTeamById/' + id, {
                    data: id
                }).then(function successCallback(response) {
                    getTeam();                    
                },function errorCallback(response){
                    $('.error').html('Wrong Credentials');
                    return;
                }) 
            }

            function buildDataTable(data) {
                $('#table-view').DataTable().destroy();
                $('#table-view').DataTable({
                    ordering: true,
                    data: data,
                    searching: true,
                    columns: [
                        {'data':'id'},
                        {'data':'name'},
                        {'data':'nickname'},
                        {
                            'data':'status',
                            render: function (data) {
                                return data == 0 ? '<span class=" status bg-success text-white">Active</span>' : '<span class="status bg-danger text-white">Inactive</span>';
                            }
                        },
                        {
                            'data': 'id', 
                            render: function(data, type) {
                                return type == 'display'
                                ? '<i class="fas fa-edit" ng-click="edit('+data+')"></i>'
                                : data  
                            }
                        },
                        {
                            'data': 'id', 
                            render: function(data, type) {
                                return type == 'display'
                                ? '<i class="fa fa-trash" ng-click="delete('+data+')" aria-hidden="true"></i>'
                                : data  
                            }
                        }
                    ],
                    rowCallback: function(row) {    
                        if (!row.compiled) {
                            $compile(angular.element(row))($scope);
                            row.compiled = true;  
                        }
                    }
                });
            }

            function getTeam() {
                $http.get(BACKEND_URL + '/api/team', {})
                .then(function successCallback(response) {
                    $location.path('/team');
                    buildDataTable(response.data.data);
                },function errorCallback(response){
                    var err = response.data.errors;
                });
            }
            getTeam();
        })

        app.controller('createTeamController', function ($rootScope, $scope, $http, $location) {
            $scope.isNew = 1;
            $scope.team = {name: '', nickname: '', status: 0};
            $scope.save = function() {
                if ($scope.team.status == null) {
                    $('#status_err').html('Please select status.');
                }
                if ($scope.team.nickname == null) {
                    $('#nickname_err').html('Please select nick name.');
                }
                if (!$scope.team.name) {
                    $('#name_err').html('Please enter name.');
                }
                else {
                    $('#name_err').html('');
                    $('#nickname_err').html('');

                    $http.post(BACKEND_URL + '/api/createTeam', {
                        data: $scope.team
                    })
                    .then(function successCallback(response) {
                        delete $scope.isNew;
                        $location.path('/team');
                    },function errorCallback(response){
                        var err = response.data.errors;
                        if (err.name) {
                            $('#name_err').html(err.name);                            
                        }
                        if (err.status) {
                            $('#status_err').html(err.status);                            
                        }
                        if (err.name) {
                            $('#nickname_err').html(err.nickname);                            
                        }
                    });
                }
            } 
        })

        app.controller('editTeamController', function ($rootScope, $scope, $http, $location) {
            var url = $location.absUrl().split('/edit/');
            var id = url[1];
            $http.get(BACKEND_URL + '/api/getTeamById/' + id , {})
            .then(function successCallback(response) {
                $location.path('/team/edit/'+id);
                $scope.team = response.data.data[0];
                if (response.data.data[0].status == 0) {
                    $scope.team.status = '0';
                } else {
                    $scope.team.status = '1';
                }
            },function errorCallback(response){
                var err = response.data.errors;
            });


            $scope.save = function() {
                if ($scope.team.status == null) {
                    $('#status_err').html('Please select status.');
                }
                if ($scope.team.nickname == null) {
                    $('#nickname_err').html('Please select nick name.');
                }
                if (!$scope.team.name) {
                    $('#name_err').html('Please enter name.');
                }
                else {
                    $('#name_err').html('');
                    $('#nickname_err').html('');

                    $http.post(BACKEND_URL + '/api/editTeamById/' + id, {
                        data: $scope.team
                    })
                    .then(function successCallback(response) {
                        $location.path('/team');
                    },function errorCallback(response){
                        var err = response.data.errors;
                        if (err.name) {
                            $('#name_err').html(err.name);                            
                        }
                        if (err.nickname) {
                            $('#nickname_err').html(err.nickname);                            
                        }
                        if (err.status) {
                            $('#status_err').html(err.status);                            
                        }
                    });
                }
            }
        })

    }
)();