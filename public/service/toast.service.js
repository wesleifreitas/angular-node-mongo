(function() {
    'use strict';

    angular
        .module('myApp')
        .factory('toastService', toastService);

    toastService.$inject = ['$mdToast', '$timeout', '$state'];

    function toastService($mdToast, $timeout, $state) {
        var service = {};

        service.message = message;

        return service;

        function message(response) {
            console.info(response);

            if (response.status === 200) {
                if (response.data.message && response.data.message !== '') {
                    $timeout(function() {
                        $mdToast.show(
                            $mdToast.simple()
                            .textContent(response.data.message)
                            .position('bottom right')
                            .hideDelay(3500)
                        );
                    }, 500);
                }
            } else {
                $mdToast.show(
                    $mdToast.simple()
                    .textContent(response.data.Message)
                    .action('Fechar')
                    .highlightAction(true)
                    .highlightClass('md-accent')
                    .position('bottom right')
                    .hideDelay(0)
                    .theme('error-toast')
                ).then(function(t) {
                    if (t === 'ok' && response.status === 401) {
                        $state.go('login');
                    }
                });
            }
        }
    }

})();