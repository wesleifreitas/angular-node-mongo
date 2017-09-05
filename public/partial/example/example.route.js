(function() {
    'use strict';

    angular
        .module('myApp')
        .config(configure);

    configure.$inject = ['$stateProvider'];

    function configure($stateProvider) {
        $stateProvider.state('example', getState());
    }

    function getState() {
        return {
            url: '/example',
            templateUrl: 'partial/example/example.html',
            controller: 'ExampleCtrl',
            controllerAs: 'vm',
            parent: 'home',
            params: {
                'id': null
            },
        };
    }
})();