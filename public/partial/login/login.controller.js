(function () {
    'use strict';

    angular.module('myApp').controller('LoginCtrl', LoginCtrl);

    LoginCtrl.$inject = ['$rootScope', '$scope', 'loginService', '$state', '$stateParams'];
    /* @ngInject */
    function LoginCtrl($rootScope, $scope, loginService, $state, $stateParams) {
        var vm = this;
        vm.selection = 'default';
        vm.formTitle = 'Login';
        vm.loginMessage = '';
        vm.login = login;
        vm.redefineForm = redefineForm;
        vm.redefine = redefine;
        vm.recover = recover;
        vm.showLogin = showLogin;
        vm.showRecover = showRecover;
        vm.showNewUser = showNewUser;

        function login() {
            if (vm.selection === 'default') {
                vm.dataLoading = true;

                loginService.Login(vm.username, vm.password)
                    .then(function success(response) {
                        console.info('login', response);
                        if (response.user.token) {
                            if (response.user.passwordChange === 1) {
                                vm.dataLoading = false;
                                vm.formTitle = 'Alteração de senha';
                                vm.selection = 'redefine';
                                vm.id = response.user.userId;
                                return;
                            }

                            loginService.SetCredentials(vm.username, vm.password, response.user.token);
                            $state.go('home');
                        } else {
                            vm.dataLoading = false;
                            vm.username = '';
                            vm.password = '';
                        }
                    }, function error(response) {
                        console.error('login', response);
                        vm.dataLoading = false;
                        //vm.username = '';
                        //vm.password = '';
                        vm.loginMessage = response.error;
                        document.getElementById('username').focus();
                    });
            }
        }

        function redefineForm() {
            // Validar senha atual
            if (String(vm.password) !== String(vm.passwordOld)) {
                $scope.loginForm.passwordOld.$setValidity('confirm', false);
            } else {
                $scope.loginForm.passwordOld.$setValidity('confirm', true);
            }

            // Validar nova senha            
            if (String(vm.passwordNew) === String(vm.password)) {
                $scope.loginForm.passwordNew.$setValidity('equal', false);
            } else {
                $scope.loginForm.passwordNew.$setValidity('equal', true);

                if (String(vm.passwordNew) !== String(vm.passwordNewConfirm)) {
                    $scope.loginForm.passwordNewConfirm.$setValidity('confirm', false);
                } else {
                    $scope.loginForm.passwordNewConfirm.$setValidity('confirm', true);
                }
            }
        }

        function redefine() {
            vm.dataLoading = true;

            loginService.Redefine(vm.id, vm.username, vm.passwordNew, function (response) {
                if (response.user.success) {
                    loginService.SetCredentials(vm.username, vm.password, response);
                    $state.go('home');
                } else {
                    vm.loginMessage = response.user.message;
                    vm.dataLoading = false;

                    $('#loginDiv').effect('shake', {
                        direction: 'left',
                        distance: 10,
                        times: 3
                    });
                }
            });
        }

        function recover() {
            vm.dataLoading = true;
            loginService.Recover(vm.username, vm.email, function (response) {
                if (response.user.success) {
                    alert('Foi enviado um e-mail para ' + vm.email + ' com as instruções de recuperação de login');
                    vm.showLogin();
                } else {
                    vm.loginMessage = response.user.message;
                    vm.dataLoading = false;

                    $('#loginDiv').effect('shake', {
                        direction: 'left',
                        distance: 10,
                        times: 3
                    });
                }
            });
        }

        function showLogin() {
            vm.password = '';
            vm.email = '';
            vm.passwordOld = '';
            vm.password = '';
            vm.passwordNewConfirm = '';
            vm.loginMessage = '';
            vm.formTitle = 'Login';
            vm.selection = 'default';
        }

        function showRecover() {
            vm.password = '';
            vm.loginMessage = '';
            vm.formTitle = 'Recuperar senha';
            vm.selection = 'recover';
        }

        function showNewUser() {
            console.log('showNewUser');
        }
    }
})();