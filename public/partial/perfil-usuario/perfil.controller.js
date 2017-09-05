(function() {
    'use strict';

    angular.module('myApp').controller('PerfilCtrl', PerfilCtrl);

    PerfilCtrl.$inject = ['config', 'perfilService', '$rootScope', '$scope', '$state', '$mdDialog'];

    function PerfilCtrl(config, perfilService, $rootScope, $scope, $state, $mdDialog) {

        var vm = this;
        vm.init = init;
        vm.getData = getData;
        vm.create = create;
        vm.update = update;
        vm.remove = remove;
        vm.perfil = {
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
            vm.perfil.data = [];
            getData();
        }

        function getData(params) {
            params = params || {};

            vm.filter.page = vm.perfil.page;
            vm.filter.limit = vm.perfil.limit;

            if (params.reset) {
                vm.perfil.data = [];
            }

            localStorage.setItem('filter', JSON.stringify(vm.filter));

            vm.perfil.promise = perfilService.get(vm.filter)
                .then(function success(response) {
                    //console.info('success', response);
                    vm.perfil.total = response.recordCount;
                    vm.perfil.data = vm.perfil.data.concat(response.query);
                }, function error(response) {
                    console.error('error', response);
                });
        }

        function create() {
            $state.go('perfil-form');
        }

        function update(id) {
            $state.go('perfil-form', { id: id });
        }

        function remove(event) {
            var confirm = $mdDialog.confirm()
                .title('ATENÇÃO')
                .textContent('Deseja realmente remover o(s) item(ns) selecionado(s)?')
                .targetEvent(event)
                .ok('SIM')
                .cancel('NÃO');

            $mdDialog.show(confirm).then(function() {
                perfilService.remove(vm.perfil.selected)
                    .then(function success(response) {
                        if (response.success) {
                            $('.md-selected').remove();
                            vm.perfil.selected = [];
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