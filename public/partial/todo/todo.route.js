(function() {
    'use strict';

    angular
        .module('myApp')
        .config(configure);

    configure.$inject = ['$stateProvider'];

    function configure($stateProvider) {
        $stateProvider.state('todo', getState());
    }

    function getState() {
        return {
            url: '/todo',
            templateUrl: 'partial/todo/todo.html',
            controller: 'TodoCtrl',
            controllerAs: 'vm',
            parent: 'home',
            params: {
                'id': null
            },
        };
    }
})();