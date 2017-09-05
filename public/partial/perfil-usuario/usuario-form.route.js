(function() {
    'use strict';

    angular
        .module('myApp')
        .config(configure);

    configure.$inject = ['$stateProvider'];

    function configure($stateProvider) {
        $stateProvider.state('usuario-form', getState());
    }

    function getState() {
        return {
            url: '/usuario/:id',
            templateUrl: 'partial/perfil-usuario/usuario-form.html',
            controller: 'UsuarioFormCtrl',
            controllerAs: 'vm',
            parent: 'home',
            params: {
                'id': null
            },
            resolve: {
                getData: getData
            }
        };
    }

    getData.$inject = ['$state', '$stateParams', 'usuarioService'];

    function getData($state, $stateParams, usuarioService) {
        console.info('$stateParams', $stateParams);

        if ($stateParams.id) {
            return usuarioService.getById($stateParams.id).then(success).catch(error);
        } else {
            return {};
        }

        function success(response) {
            console.info(response);
            if (response.query.length === 0) {
                $state.go('404');
            } else {
                return response.query[0];
            }
        }

        function error(response) {
            return response;
        }
    }
})();