(function() {
    'use strict';

    angular.module('myApp').controller('GrupoCtrl', GrupoCtrl);

    GrupoCtrl.$inject = ['config', 'grupoService', '$rootScope', '$scope', '$state', '$mdDialog'];

    function GrupoCtrl(config, grupoService, $rootScope, $scope, $state, $mdDialog) {

        var vm = this;
        vm.init = init;
        vm.getData = getData;
        vm.create = create;
        vm.update = update;
        vm.remove = remove;
        vm.grupo = {
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
            vm.grupo.data = [];
            getData();
        }

        function getData(params) {
            params = params || {};

            vm.filter.page = vm.grupo.page;
            vm.filter.limit = vm.grupo.limit;

            if (params.reset) {
                vm.grupo.data = [];
            }

            localStorage.setItem('filter', JSON.stringify(vm.filter));

            vm.grupo.promise = grupoService.get(vm.filter, true)
                .then(function success(response) {
                    console.info('success', response);
                    vm.grupo.total = response.recordCount;
                    vm.grupo.data = vm.grupo.data.concat(response.query);
                }, function error(response) {
                    console.error('error', response);
                });
        }

        function create() {
            $state.go('grupo-form');
        }

        function update(id) {
            $state.go('grupo-form', { id: id });
        }

        function remove(event) {
            var confirm = $mdDialog.confirm()
                .title('ATENÇÃO')
                .textContent('Deseja realmente remover o(s) item(ns) selecionado(s)?')
                .targetEvent(event)
                .ok('SIM')
                .cancel('NÃO');

            $mdDialog.show(confirm).then(function() {
                grupoService.remove(vm.grupo.selected)
                    .then(function success(response) {
                        if (response.success) {
                            $('.md-selected').remove();
                            vm.grupo.selected = [];
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