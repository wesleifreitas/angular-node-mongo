(function() {
    'use strict';

    angular.module('myApp').controller('ExampleCtrl', ExampleCtrl);

    ExampleCtrl.$inject = ['config', 'exampleService', '$rootScope', '$scope', '$state', '$mdDialog'];

    function ExampleCtrl(config, exampleService, $rootScope, $scope, $state, $mdDialog) {

        var vm = this;
        vm.init = init;
        vm.getData = getData;
        vm.create = create;
        vm.update = update;
        vm.remove = remove;
        vm.example = {
            limit: 10,
            page: 1,
            selected: [],
            order: '',
            data: [],
            pagination: pagination,
            total: 0
        };

        // $on
        // https://docs.angularjs.org/api/ng/type/$rootScope.Scope
        $scope.$on('broadcastTest', function() {
            console.info('broadcastTest!');
            //getData();
        });

        function init() {

            var filterLast = JSON.parse(localStorage.getItem('filter')) || {};

            if (filterLast[$state.current.url.split('/')[1]]) {
                vm.filter = filterLast;
            } else {
                vm.filter = {};
                vm.filter[$state.current.url.split('/')[1]] = true;
            }

            getData({ reset: true });
        }

        function pagination(page, limit) {
            vm.example.data = [];
            getData();
        }

        function getData(params) {

            params = params || {};

            vm.filter.page = vm.example.page;
            vm.filter.limit = vm.example.limit;

            if (params.reset) {
                vm.example.data = [];
            }

            localStorage.setItem('filter', JSON.stringify(vm.filter));
            vm.example.promise = exampleService.get(vm.filter)
                .then(function success(response) {
                    //console.info('success', response);
                    vm.example.total = response.recordCount;
                    vm.example.data = vm.example.data.concat(response.query);
                }, function error(response) {
                    console.error('error', response);
                });
        }

        function create() {
            $state.go('example-form');
        }

        function update(id) {
            $state.go('example-form', { id: id });
        }

        function remove(event) {

            var confirm = $mdDialog.confirm()
                .title('ATENÇÃO')
                .textContent('Deseja realmente remover o(s) item(ns) selecionado(s)?')
                .targetEvent(event)
                .ok('SIM')
                .cancel('NÃO');

            $mdDialog.show(confirm).then(function() {
                exampleService.remove(vm.example.selected)
                    .then(function success(response) {
                        if (response.success) {
                            $('.md-selected').remove();
                            vm.example.selected = [];
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