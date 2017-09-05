(function() {
    'use strict';

    angular.module('myApp').factory('cepService', cepService);

    cepService.$inject = ['$http'];
    /* @ngInject */
    function cepService($http) {

        var service = {
            cep: cep,
            uf: uf
        };
        return service;

        function cep(value) {
            return $http({
                method: 'GET',
                url: 'https://viacep.com.br/ws/' + value + '/json'
            });
        }

        function uf(showAll) {
            var arrayData = [{
                name: 'Acre',
                id: 'AC'
            }, {
                name: 'Alagoas',
                id: 'AP'
            }, {
                name: 'Amapá',
                id: 'AL'
            }, {
                name: 'Amazonas',
                id: 'AM'
            }, {
                name: 'Bahia',
                id: 'BA'
            }, {
                name: 'Ceará',
                id: 'CE'
            }, {
                name: 'Distrito Federal',
                id: 'DF'
            }, {
                name: 'Espírito Santo',
                id: 'ES'
            }, {
                name: 'Goiás',
                id: 'GO'
            }, {
                name: 'Maranhão',
                id: 'MA'
            }, {
                name: 'Mato Grosso',
                id: 'MT'
            }, {
                name: 'Mato Grosso do Sul',
                id: 'MS'
            }, {
                name: 'Minas Gerais',
                id: 'MG'
            }, {
                name: 'Paraná',
                id: 'PR'
            }, {
                name: 'Paraíba',
                id: 'PB'
            }, {
                name: 'Pará',
                id: 'PA'
            }, {
                name: 'Pernambuco',
                id: 'PE'
            }, {
                name: 'Piauí',
                id: 'PI'
            }, {
                name: 'Rio de Janeiro',
                id: 'RJ'
            }, {
                name: 'Rio Grande do Norte',
                id: 'RN'
            }, {
                name: 'Rio Grande do Sul',
                id: 'RS'
            }, {
                name: 'Rondônia',
                id: 'RO'
            }, {
                name: 'Roraima',
                id: 'RR'
            }, {
                name: 'Santa Catarina',
                id: 'SC'
            }, {
                name: 'Sergipe',
                id: 'SE'
            }, {
                name: 'São Paulo',
                id: 'SP'
            }, {
                name: 'Tocantins',
                id: 'TO'
            }];

            return arrayData.sort(function(a, b) {
                var x = a.name;
                var y = b.name;
                return ((x < y) ? -1 : ((x > y) ? 1 : 0));
            });
        }
    }
}());