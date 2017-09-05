(function() {
    'use strict';

    angular
        .module('myApp')
        .factory('perfilService', perfilService);

    perfilService.$inject = ['config', '$http', '$q', 'toastService', '$timeout'];

    function perfilService(config, $http, $q, toastService, $timeout) {
        var service = {};

        service.get = get;
        service.getById = getById;
        service.create = create;
        service.update = update;
        service.remove = remove;
        service.removeById = removeById;
        service.jsTreeGrupo = jsTreeGrupo;
        service.jsTreeMenu = jsTreeMenu;

        return service;

        function get(params) {

            var req = $http({
                    url: config.REST_URL + '/perfil/',
                    method: 'GET',
                    headers: {
                        'Authorization': '',
                        'Content-Type': 'application/json'
                    },
                    params: params
                })
                .then(handleSuccess, handleError);

            return req;
        }

        function getById(id) {

            var req = $http({
                    url: config.REST_URL + '/perfil/' + id,
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                .then(handleSuccess, handleError);

            return req;
        }

        function create(data) {

            var req = $http({
                    url: config.REST_URL + '/perfil/',
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    data: data
                })
                .then(handleSuccess, handleError);

            return req;
        }

        function update(id, data) {

            var req = $http({
                    url: config.REST_URL + '/perfil/' + id,
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    data: data
                })
                .then(handleSuccess, handleError);

            return req;
        }

        function remove(data) {
            var req = $http({
                    url: config.REST_URL + '/perfil/',
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    data: data
                })
                .then(handleSuccess, handleError);

            return req;
        }

        function removeById(id) {
            var req = $http({
                    url: config.REST_URL + '/perfil/' + id,
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                .then(handleSuccess, handleError);

            return req;
        }

        function jsTreeGrupo(perfil, operador) {
            var req = $http({
                    url: config.REST_URL + '/perfil/' + perfil + '/' + operador,
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                .then(handleSuccess, handleError);

            return req;
        }

        function jsTreeMenu(params) {

            params = params || {};
            params.projectId = config.PROJECT_ID || 0;

            var req = $http({
                    url: config.REST_URL + '/perfil/treeMenu',
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    params: params
                })
                .then(handleSuccess, handleError);

            return req;
        }

        // private functions

        function handleSuccess(response) {
            console.info('handleSuccess', response);
            if (response.data.message && response.data.message !== '') {

                toastService.message(response);

            }

            return response.data;
        }

        function handleError(response) {
            console.error('handleError', response);
            if (!angular.isObject(response.data) || !response.data.Message) {
                response.data.Message = 'Ops! Ocorreu um erro desconhecido';
            }

            toastService.message(response);

            return ($q.reject(response.data.Message));
        }
    }

})();