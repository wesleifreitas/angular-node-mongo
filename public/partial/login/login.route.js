(function() {
    'use strict';

    angular
        .module('myApp')
        .config(configure);

    configure.$inject = ['$stateProvider'];
    /* @ngInject */
    function configure($stateProvider) {
        $stateProvider.state('login', getState());
    }

    function getState() {
        return {
            url: '/login/:action',
            controller: 'LoginCtrl',
            controllerAs: 'vm',
            templateUrl: 'partial/login/login.html',
            title: 'login'
        };
    }
})();