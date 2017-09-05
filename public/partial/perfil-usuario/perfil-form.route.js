(function() {
    'use strict';

    angular
        .module('myApp')
        .config(configure);

    configure.$inject = ['$stateProvider'];

    function configure($stateProvider) {
        $stateProvider.state('perfil-form', getState());
    }

    function getState() {
        return {
            url: '/perfil/:id',
            templateUrl: 'partial/perfil-usuario/perfil-form.html',
            controller: 'PerfilFormCtrl',
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

    getData.$inject = ['$state', '$stateParams', 'perfilService'];

    function getData($state, $stateParams, perfilService) {
        //console.info('$stateParams', $stateParams);

        if ($stateParams.id) {
            return perfilService.getById($stateParams.id).then(success).catch(error);
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