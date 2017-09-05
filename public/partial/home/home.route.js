(function() {
    'use strict';

    angular
        .module('myApp')
        .config(configure);

    configure.$inject = ['$stateProvider'];
    /* @ngInject */
    function configure($stateProvider) {
        $stateProvider.state('home', getState());
    }

    function getState() {
        return {
            url: '/home',
            templateUrl: 'partial/home/home.html',
            controller: 'HomeCtrl',
            controllerAs: 'vm',
            title: 'Home'
        };
    }
})();