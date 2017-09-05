(function() {
    'use strict';

    angular.module('myApp').controller('GrupoFormCtrl', GrupoFormCtrl);

    GrupoFormCtrl.$inject = ['$state', '$stateParams', '$mdDialog', 'grupoService', 'getData'];

    function GrupoFormCtrl($state, $stateParams, $mdDialog, grupoService, getData) {

        var vm = this;
        vm.init = init;
        vm.grupo = {};
        vm.getData = getData;
        vm.removeById = removeById;
        vm.cancel = cancel;
        vm.save = save;

        function init() {
            if ($stateParams.id) {
                vm.action = 'update';
                vm.grupo = vm.getData;
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
                grupoService.removeById($stateParams.id)
                    .then(function success(response) {
                        console.info('success', response);
                        $state.go('perfil-usuario', { tabIndex: 0 });
                    }, function error(response) {
                        console.error('error', response);
                    });
            }, function() {
                // cancel
            });
        }

        function cancel() {
            $state.go('perfil-usuario', { tabIndex: 0 });
        }

        function save() {

            if ($stateParams.id) {
                //update
                grupoService.update($stateParams.id, vm.grupo)
                    .then(function success(response) {
                        console.info('success', response);
                        $state.go('perfil-usuario', { tabIndex: 0 });
                    }, function error(response) {
                        console.error('error', response);
                    });
            } else {
                // create
                grupoService.create(vm.grupo)
                    .then(function success(response) {
                        if (response.success) {
                            $state.go('perfil-usuario', { tabIndex: 0 });
                        }
                        console.info('success', response);
                    }, function error(response) {
                        console.error('error', response);
                    });
            }
        }
    }
})();