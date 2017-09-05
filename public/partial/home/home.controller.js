(function() {
    'use strict';

    angular.module('myApp').controller('HomeCtrl', HomeCtrl);

    HomeCtrl.$inject = ['$rootScope', '$state', '$mdUtil', '$mdSidenav', 'grupoService', 'loginService'];
    /* @ngInject */
    function HomeCtrl($rootScope, $state, $mdUtil, $mdSidenav, grupoService, loginService) {
        var vm = this;
        vm.navBarClick = navBarClick;
        vm.sideMenuClick = sideMenuClick;
        vm.logout = logout;
        vm.toggleRight = buildToggler('right');
        vm.toggleLeft = buildToggler('left');
        vm.sideNav = {
            username: $rootScope.globals.currentUser.username.split(' ')[0]
        };
        vm.querySearch = querySearch;
        vm.selectedItemChange = selectedItemChange;
        vm.grupoSearchBlur = grupoSearchBlur;
        vm.sideMenuClick = sideMenuClick;

        init();

        function init() {
            var filter = {};
            filter.page = 1;
            filter.limit = 1;

            /*grupoService.get(filter, false)
                .then(function success(response) {
                    if (response.query.length > 0) {
                        $rootScope.globals.currentUser.grupoSelected = {
                            id: response.query[0].GRUPO_ID,
                            name: response.query[0].GRUPO_NOME
                        };
                        vm.searchText = response.query[0].GRUPO_NOME;
                    } else {
                        console.warn('home init: usuário sem grupo!');
                    }
                }, function error(response) {
                    console.error('error', response);
                });*/
        }

        function navBarClick(event) {
            $state.go(event.state);
        }

        function sideMenuClick(event) {
            console.info('sideMenuClick', event);
            $mdSidenav('left').close();
        }

        function logout() {
            /*loginService.Logout()
                .then(function success(response) {
                    loginService.ClearCredentials();
                    $state.go('login');
                }, function error(response) {
                    console.error(response);
                });*/

            //loginService.ClearCredentials();
            $state.go('login');
        }

        function buildToggler(navID) {
            var debounceFn = $mdUtil.debounce(function() {
                $mdSidenav(navID)
                    .toggle()
                    .then(function() {
                        //$log.debug("toggle " + navID + " is done");
                    });
            }, 300);
            return debounceFn;
        }

        document.querySelector('md-autocomplete#grupoSearch').addEventListener('click', function(event) {
            // clicou no ícone
            if (event.target.id === '') {
                alert();
            }
        });

        function querySearch(text) {
            var filter = {};
            filter.page = 1;
            filter.limit = 5;
            filter.GRUPO_NOME = text;

            //console.info(filter);

            return grupoService.get(filter, false)
                .then(function success(response) {
                    //console.info('success', response);
                    return response.query;
                }, function error(response) {
                    console.error('error', response);
                });
        }

        function selectedItemChange(item) {
            //console.info('selectedItemChange', item);
            if (item) {
                $rootScope.globals.currentUser.grupoSelected = {
                    id: item.GRUPO_ID,
                    name: item.GRUPO_NOME
                };
            }
        }

        function grupoSearchBlur(event) {
            //console.log('grupoSearchBlur', vm.selectedItem);

            if (vm.selectedItem) {
                $rootScope.globals.currentUser.grupoSelected = {
                    id: vm.selectedItem.GRUPO_ID,
                    name: vm.selectedItem.GRUPO_NOME
                };
            } else if ($rootScope.globals.currentUser.grupoSelected) {
                vm.searchText = $rootScope.globals.currentUser.grupoSelected.name;
            }
        }
    }
})();