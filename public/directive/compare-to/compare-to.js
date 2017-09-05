(function() {
    'use strict';

    angular.module('myApp').directive('compareTo', compareTo);

    compareTo.$inject = [];

    function compareTo() {
        var directive = {
            require: 'ngModel',
            scope: {
                otherModelValue: '=compareTo',
                caseSensitive: '=?caseSensitive',
                empty: '=?empty',
            },
            link: link
        };
        return directive;

        function link(scope, element, attrs, ngModel) {

            scope.caseSensitive = angular.isDefined(scope.caseSensitive) ? scope.caseSensitive : true;
            scope.empty = angular.isDefined(scope.empty) ? scope.empty : true;

            ngModel.$validators.compareTo = function(modelValue) {

                if (!scope.caseSensitive && scope.otherModelValue) {
                    return String(modelValue).toLowerCase() === String(scope.otherModelValue).toLowerCase();
                } else {
                    if (!scope.empty && !scope.otherModelValue) {
                        return true;
                    }
                    return modelValue === scope.otherModelValue;
                }
            };

            scope.$watch('otherModelValue', function() {
                ngModel.$validate();
            });
        }
    }
})();