(function() {
    'use strict';

    angular
        .module('myApp')
        .config(configure);

    configure.$inject = ['$stateProvider'];

    function configure($stateProvider) {
        $stateProvider.state('grupo-form', getState());
    }

    function getState() {
        return {
            url: '/grupo/:id',
            templateUrl: 'partial/perfil-usuario/grupo-form.html',
            controller: 'GrupoFormCtrl',
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

    getData.$inject = ['$state', '$stateParams', 'grupoService'];

    function getData($state, $stateParams, grupoService) {
        //console.info('$stateParams', $stateParams);

        if ($stateParams.id) {
            return grupoService.getById($stateParams.id).then(success).catch(error);
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