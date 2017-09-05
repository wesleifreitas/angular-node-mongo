(function() {
    'use strict';

    angular
        .module('myApp')
        .factory('loginService', loginService);

    loginService.$inject = ['config', '$http', '$cookies', '$rootScope', '$q'];

    function loginService(config, $http, $cookies, $rootScope, $q) {
        var service = {};

        service.Login = Login;
        service.Logout = Logout;
        service.SetCredentials = SetCredentials;
        service.ClearCredentials = ClearCredentials;

        // Base64 encoding service used by loginService
        var Base64 = {

            keyStr: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=',

            encode: function(input) {
                var output = '';
                var chr1, chr2, chr3 = '';
                var enc1, enc2, enc3, enc4 = '';
                var i = 0;

                do {
                    chr1 = input.charCodeAt(i++);
                    chr2 = input.charCodeAt(i++);
                    chr3 = input.charCodeAt(i++);

                    /* jshint ignore:start */
                    enc1 = chr1 >> 2;
                    enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
                    enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
                    enc4 = chr3 & 63;
                    /* jshint ignore:end */

                    if (isNaN(chr2)) {
                        enc3 = enc4 = 64;
                    } else if (isNaN(chr3)) {
                        enc4 = 64;
                    }

                    output = output +
                        this.keyStr.charAt(enc1) +
                        this.keyStr.charAt(enc2) +
                        this.keyStr.charAt(enc3) +
                        this.keyStr.charAt(enc4);
                    chr1 = chr2 = chr3 = '';
                    enc1 = enc2 = enc3 = enc4 = '';
                } while (i < input.length);

                return output;
            },

            decode: function(input) {
                var output = '';
                var chr1, chr2, chr3 = '';
                var enc1, enc2, enc3, enc4 = '';
                var i = 0;

                // remove all characters that are not A-Z, a-z, 0-9, +, /, or =
                var base64test = /[^A-Za-z0-9\+\/\=]/g;
                if (base64test.exec(input)) {
                    window.alert('There were invalid base64 characters in the input text.\n' +
                        'Valid base64 characters are A-Z, a-z, 0-9, "+", "/",and "="\n' +
                        'Expect errors in decoding.');
                }
                input = input.replace(/[^A-Za-z0-9\+\/\=]/g, '');

                do {
                    enc1 = this.keyStr.indexOf(input.charAt(i++));
                    enc2 = this.keyStr.indexOf(input.charAt(i++));
                    enc3 = this.keyStr.indexOf(input.charAt(i++));
                    enc4 = this.keyStr.indexOf(input.charAt(i++));

                    /* jshint ignore:start */
                    chr1 = (enc1 << 2) | (enc2 >> 4);
                    chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
                    chr3 = ((enc3 & 3) << 6) | enc4;
                    /* jshint ignore:end */

                    output = output + String.fromCharCode(chr1);

                    if (enc3 !== 64) {
                        output = output + String.fromCharCode(chr2);
                    }
                    if (enc4 !== 64) {
                        output = output + String.fromCharCode(chr3);
                    }

                    chr1 = chr2 = chr3 = '';
                    enc1 = enc2 = enc3 = enc4 = '';

                } while (i < input.length);

                return output;
            }
        };

        return service;

        function Login(username, password) {
            var req = $http({
                    url: config.REST_URL + '/users/login',
                    method: 'POST',
                    data: {
                        user: {
                            email: username,
                            username: username,
                            password: password
                        }
                    }
                })
                .then(handleSuccess, handleError);;

            return req;
        }

        function Logout() {
            var req = $http({
                    url: config.REST_URL + '/logout',
                    method: 'POST'
                })
                .then(handleSuccess, handleError);;

            return req;
        }

        function SetCredentials(username, password, token) {
            var authdata = Base64.encode(username + ':' + password);

            $rootScope.globals = {
                currentUser: {
                    username: username,
                    token: token
                }
            };

            $http.defaults.headers.common['Authorization'] = 'Token ' + token; // jshint ignore:line
            $cookies.putObject('globals', $rootScope.globals);
        }

        function ClearCredentials() {
            $rootScope.globals = {};
            $cookies.remove('globals');
            $http.defaults.headers.common.Authorization = 'Basic';
        }

        // private functions

        function handleSuccess(response) {
            return response.data;
        }

        function handleError(response) {
            return ($q.reject(response.data));
        }
    }
})();