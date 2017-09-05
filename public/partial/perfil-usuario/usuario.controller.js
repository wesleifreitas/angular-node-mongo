(function() {
    'use strict';

    angular.module('myApp').controller('UsuarioCtrl', UsuarioCtrl);

    UsuarioCtrl.$inject = ['config', 'usuarioService', '$rootScope', '$scope', '$state', '$mdDialog'];

    function UsuarioCtrl(config, usuarioService, $rootScope, $scope, $state, $mdDialog) {

        var vm = this;
        vm.init = init;
        vm.getData = getData;
        vm.create = create;
        vm.update = update;
        vm.remove = remove;
        vm.usuario = {
            limit: 5,
            page: 1,
            selected: [],
            order: '',
            data: [],
            pagination: pagination,
            total: 0
        };

        function init(event) {

            var filterLast = JSON.parse(localStorage.getItem('filter')) || {};

            if (filterLast[$state.current.url.split('/')[1]]) {
                vm.filter = filterLast;
            } else {
                vm.filter = {};
                vm.filter[$state.current.url.split('/')[1]] = true;
            }

            getData({ reset: true });
        }

        // $on
        // https://docs.angularjs.org/api/ng/type/$rootScope.Scope
        $scope.$on('broadcastTest', function() {
            console.info('broadcastTest!');
            //getData();
        });

        function pagination(page, limit) {
            vm.usuario.data = [];
            getData();
        }

        function getData(params) {
            params = params || {};

            vm.filter.page = vm.usuario.page;
            vm.filter.limit = vm.usuario.limit;

            if (params.reset) {
                vm.usuario.data = [];
            }

            localStorage.setItem('filter', JSON.stringify(vm.filter));

            vm.usuario.promise = usuarioService.get(vm.filter)
                .then(function success(response) {
                    //console.info('success', response);
                    vm.usuario.total = response.recordCount;

                    // Ajustar date
                    for (var i = 0; i <= response.query.length - 1; i++) {
                        if (response.query[i].USU_ULTIMOACESSO !== '') {
                            response.query[i].USU_ULTIMOACESSO = new Date(response.query[i].USU_ULTIMOACESSO);
                        }
                    }
                    vm.usuario.data = vm.usuario.data.concat(response.query);
                }, function error(response) {
                    console.error('error', response);
                });
        }

        function create() {
            $state.go('usuario-form');
        }

        function update(id) {
            $state.go('usuario-form', { id: id });
        }

        function remove(event) {
            var confirm = $mdDialog.confirm()
                .title('ATENÇÃO')
                .textContent('Deseja realmente remover o(s) item(ns) selecionado(s)?')
                .targetEvent(event)
                .ok('SIM')
                .cancel('NÃO');

            $mdDialog.show(confirm).then(function() {
                usuarioService.remove(vm.usuario.selected)
                    .then(function success(response) {
                        if (response.success) {
                            $('.md-selected').remove();
                            vm.usuario.selected = [];
                        }
                    }, function error(response) {
                        console.error('error', response);
                    });
            }, function() {
                // cancel
            });
        }
    }
})();