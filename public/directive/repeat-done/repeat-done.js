(function() {
    'use strict';

    angular.module('myApp').directive('repeatDone', repeatDone);

    repeatDone.$inject = [];

    function repeatDone() {
        var directive = {
            link: link
        };
        return directive;

        function link(scope, element, attrs) {
            if (scope.$last) {
                scope.$eval(attrs.repeatDone);
            }
        }
    }
})();