(function() {
    'use strict';

    angular.module('myApp').controller('ExampleFormCtrl', ExampleFormCtrl);

    ExampleFormCtrl.$inject = ['$scope', '$state', '$stateParams', '$mdDialog', 'exampleService', 'getData', 'EXAMPLE'];

    function ExampleFormCtrl($scope, $state, $stateParams, $mdDialog, exampleService, getData, EXAMPLE) {

        var vm = this;
        vm.init = init;
        vm.example = {};
        vm.uf = EXAMPLE.UF;
        vm.getData = getData;
        vm.removeById = removeById;
        vm.cancel = cancel;
        vm.save = save;

        function init() {
            if ($stateParams.id) {
                vm.action = 'update';

                vm.example = {
                    nome: vm.getData.NOME,
                    cpf: String(vm.getData.CPF),
                    data: new Date(vm.getData.DATA)
                };
            } else {
                vm.action = 'create';
            }
        }

        function removeById(event) {
            var confirm = $mdDialog.confirm()
                .title('ATENÇÃO')
                .textContent('Deseja realmente remover este registro?')
                .targetEvent(event)
                .ok('SIM')
                .cancel('NÃO');

            $mdDialog.show(confirm).then(function() {
                exampleService.removeById($stateParams.id)
                    .then(function success(response) {
                        if (response.success) {
                            console.info('success', response);
                            $state.go('example');
                        } else {
                            console.warn('warn', response);
                        }
                    }, function error(response) {
                        console.error('error', response);
                    });
            }, function() {
                // cancel
            });
        }

        function cancel() {
            $state.go('example');
        }

        function save() {

            if ($stateParams.id) {
                //update
                exampleService.update($stateParams.id, vm.example)
                    .then(function success(response) {
                        if (response.success) {
                            console.info('success', response);
                            $state.go('example');
                        } else {
                            console.warn('warn', response);
                        }
                    }, function error(response) {
                        console.error('error', response);
                    });
            } else {
                // create
                exampleService.create(vm.example)
                    .then(function success(response) {
                        if (response.success) {
                            console.info('success', response);
                            $state.go('example');
                        } else {
                            console.warn('warn', response);
                        }
                    }, function error(response) {
                        console.error('error', response);
                    });
            }
        }
    }
})();