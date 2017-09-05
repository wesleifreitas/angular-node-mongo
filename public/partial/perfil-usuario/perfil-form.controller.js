(function() {
    'use strict';

    angular.module('myApp').controller('PerfilFormCtrl', PerfilFormCtrl);

    PerfilFormCtrl.$inject = ['config', '$state', '$stateParams', '$mdDialog', 'perfilService', 'getData', 'PERFIL'];

    function PerfilFormCtrl(config, $state, $stateParams, $mdDialog, perfilService, getData, PERFIL) {

        var vm = this;
        vm.init = init;
        vm.perfil = {};
        vm.status = PERFIL.STATUS;
        vm.getData = getData;
        vm.removeById = removeById;
        vm.cancel = cancel;
        vm.save = save;
        vm.jstreeGrupoConfig = jstreeGrupoConfig;
        vm.jstreeMenuConfig = jstreeMenuConfig;
        vm.acesso = acesso;

        function init() {
            if ($stateParams.id) {
                vm.action = 'update';

                vm.perfil = {
                    statusSelected: vm.getData.PER_ATIVO,
                    nome: vm.getData.PER_NOME,
                    per_master: vm.getData.PER_MASTER
                };

                perfilService.jsTreeGrupo(vm.getData.PER_ID, vm.getData.GRUPO_ID)
                    .then(function success(response) {
                        //console.info('jsTreeGrupo', response);
                        if (!angular.isDefined($('#jstreeGrupo').jstree(true).settings)) {
                            $('#jstreeGrupo').jstree(response.jstree);
                        } else {
                            //console.info('refresh', response.jstree);
                            $('#jstreeGrupo').jstree(true).settings.core.data = response.jstree.core.data;
                            $('#jstreeGrupo').jstree(true).refresh();
                        }
                    }, function error(response) {
                        console.error(response);
                    });

                var params = {};
                params.perfilId = vm.getData.PER_ID;

                perfilService.jsTreeMenu(params)
                    .then(function success(response) {
                        //console.info('jsTreeMenu', response);
                        if (!angular.isDefined($('#jstreeMenu').jstree(true).settings)) {
                            $('#jstreeMenu').jstree(response.jstree);
                        } else {
                            //console.info('refresh', response.jstree);
                            $('#jstreeMenu').jstree(true).settings.core.data = response.jstree.core.data;
                            $('#jstreeMenu').jstree(true).refresh();
                        }
                    }, function error(response) {
                        console.error(response);
                    });
            } else {
                vm.action = 'create';
                vm.perfil.statusSelected = 1;
                vm.perfil.per_master = 0;

                perfilService.jsTreeGrupo(0, 1)
                    .then(function success(response) {
                        //console.info(response);
                        if (!angular.isDefined($('#jstreeGrupo').jstree(true).settings)) {
                            $('#jstreeGrupo').jstree(response.jstree);
                        } else {
                            console.info('refresh', response.jstree);
                            $('#jstreeGrupo').jstree(true).settings.core.data = response.jstree.core.data;
                            $('#jstreeGrupo').jstree(true).refresh();
                        }
                    }, function error(response) {
                        console.error(response);
                    });

                perfilService.jsTreeMenu()
                    .then(function success(response) {
                        //console.info(response);
                        if (!angular.isDefined($('#jstreeMenu').jstree(true).settings)) {
                            $('#jstreeMenu').jstree(response.jstree);
                        } else {
                            console.info('refresh', response.jstree);
                            $('#jstreeMenu').jstree(true).settings.core.data = response.jstree.core.data;
                            $('#jstreeMenu').jstree(true).refresh();
                        }
                    }, function error(response) {
                        console.error(response);
                    });
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
                perfilService.removeById($stateParams.id)
                    .then(function success(response) {
                        if (response.success) {
                            //console.info('success', response);
                            $state.go('perfil-usuario', { tabIndex: 1 });
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
            $state.go('perfil-usuario', { tabIndex: 1 });
        }

        function save() {

            vm.perfil.jstreeDataGrupo = vm.jstreeDataGrupo;
            vm.perfil.jstreeDataMenu = vm.jstreeDataMenu;

            if ($stateParams.id) {
                //update
                perfilService.update($stateParams.id, vm.perfil)
                    .then(function success(response) {
                        if (response.success) {
                            //console.info('success', response);
                            $state.go('perfil-usuario', { tabIndex: 1 });
                        } else {
                            console.warn('warn', response);
                        }
                    }, function error(response) {
                        console.error('error', response);
                    });
            } else {
                // create
                perfilService.create(vm.perfil)
                    .then(function success(response) {
                        if (response.success) {
                            //console.info('success', response);
                            $state.go('perfil-usuario', { tabIndex: 1 });
                        } else {
                            console.warn('warn', response);
                        }
                    }, function error(response) {
                        console.error('error', response);
                    });
            }
        }

        function jstreeGrupoConfig() {
            $('#jstreeGrupo').on('changed.jstree', function(e, data) {
                console.info(data);
                vm.jstreeDataGrupo = data.selected;
            });
        }

        function jstreeMenuConfig() {
            $('#jstreeMenu').on('changed.jstree', function(e, data) {
                //console.info(data);
                vm.jstreeDataMenu = data.selected;
            });
        }

        function acesso(item) {
            var locals = {};

            $mdDialog.show({
                locals: locals,
                preserveScope: true,
                controller: 'PerfilAcessoDialogCtrl',
                controllerAs: 'vm',
                templateUrl: 'partial/perfil-usuario/perfil-acesso-dialog.html',
                parent: angular.element(document.body),
                targetEvent: event,
                clickOutsideToClose: false
            }).then(function(data) {
                //console.info(data);
            });
        }
    }
})();