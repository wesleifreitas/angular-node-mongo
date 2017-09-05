(function() {
    'use strict';

    angular.module('myApp').directive('sideMenu', sideMenu);

    sideMenu.$inject = ['$compile'];

    function sideMenu($compile) {
        var directive = {
            restrict: 'E',
            transclude: true,
            scope: {
                title: '@',
                itemClick: '&'
            },
            link: link,
            controller: controller
        };
        return directive;

        function link(scope, element, attrs, ngModel) {
            var watchsideMenuHtml = scope.$watch('sideMenuHtml', function(newValue, oldValue) {
                if (newValue !== oldValue) {
                    element.html(scope.sideMenuHtml);
                    $compile(element.contents())(scope);
                    watchsideMenuHtml();
                }
            });
        }
    }

    controller.$inject = ['config', '$scope', '$http', '$rootScope', '$sce'];

    function controller(config, $scope, $http, $rootScope, $sce) {

        $scope.getsideMenu = function() {
            var params = {};
            params.sideMenu = true;
            params.user = $rootScope.globals.currentUser.userid;

            $http({
                method: 'GET',
                url: config.REST_URL + '/navBar',
                params: params
            }).then(function success(response) {
                console.info(response);
                console.info(response.data.sideMenu);
                $scope.sideMenuHtml = response.data.sideMenu;
            }, function error(response) {
                console.error(response);
            });
        };

        $scope.showView = function(state) {
            $scope.itemClick({
                event: {
                    state: state
                }
            });
        };

        $scope.isMobile = function() {
            var userAgent = navigator.userAgent.toLowerCase();
            if (userAgent.search(/(android|avantgo|blackberry|bolt|boost|cricket|docomo|fone|hiptop|mini|mobi|palm|phone|pie|tablet|up\.browser|up\.link|webos|wos)/i) != -1) { // jshint ignore:line
                return true;
            } else {
                return false;
            }
        };

        // Inicializar menu
        $scope.getsideMenu();
    }
})();