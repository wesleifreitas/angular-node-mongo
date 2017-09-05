(function() {
    'use strict';

    angular.module('myApp').constant('USUARIO', {
        STATUS: [{
            id: 1,
            name: 'Ativo'
        }, {
            id: 0,
            name: 'Inativo'
        }]
    });
})();