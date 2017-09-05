(function() {
    'use strict';

    angular
        .module('myApp')
        .config(configure);

    configure.$inject = ['$stateProvider'];

    function configure($stateProvider) {
        $stateProvider.state('404', getState());
    }

    function getState() {
        return {
            url: '/404',
            templateUrl: 'partial/404/404.html',
            controller: 'PageNotFound',
            controllerAs: 'vm',
            parent: 'home'
        };
    }
})();