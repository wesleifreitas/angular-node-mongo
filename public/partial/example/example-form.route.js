(function() {
    'use strict';

    angular
        .module('myApp')
        .config(configure);

    configure.$inject = ['$stateProvider'];

    function configure($stateProvider) {
        $stateProvider.state('example-form', getState());
    }

    function getState() {
        return {
            url: '/example/:id',
            templateUrl: 'partial/example/example-form.html',
            controller: 'ExampleFormCtrl',
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

    getData.$inject = ['$state', '$stateParams', 'exampleService'];

    function getData($state, $stateParams, exampleService) {
        console.info('$stateParams', $stateParams);

        if ($stateParams.id) {
            return exampleService.getById($stateParams.id).then(success, error);
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