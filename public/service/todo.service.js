(function() {
    'use strict';

    angular
        .module('myApp')
        .factory('todoService', todoService);

    todoService.$inject = ['config', '$http', '$q', 'toastService', '$timeout'];

    function todoService(config, $http, $q, toastService, $timeout) {
        var service = {};

        service.get = get;
        service.create = create;
        service.remove = remove;

        return service;

        function get(params) {

            var req = $http.get(config.REST_URL + '/todos')
                .then(handleSuccess, handleError);

            return req;
        }

        function create(data) {

            var req = $http.post(config.REST_URL + '/todos', data)
                .then(handleSuccess, handleError);

            return req;
        }

        function remove(id) {
            var req = $http.delete(config.REST_URL + '/todos/' + id)
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