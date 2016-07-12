//use strict
var app = angular.module('AngularAuthApp', ['ngRoute', 'LocalStorageModule', 'angular-loading-bar', 'ngFormValidator', 'ui.bootstrap']);

app.config(function ($routeProvider) {

    var viewRoot = 'web/app/views/';

    $routeProvider.when("/home", {
        controller: "homeController",
        templateUrl: viewRoot + "home.html"
    });

    $routeProvider.when("/login", {
        controller: "loginController",
        templateUrl: viewRoot + "login.html"
    });

    $routeProvider.when("/signup", {
        controller: "signupController",
        templateUrl: viewRoot + "signup.html"
    });

    $routeProvider.when("/user", {
        controller: "userController",
        templateUrl: viewRoot + "user.html"
    });

    $routeProvider.when("/logMessage", {
        controller: "logMessageController",
        templateUrl: viewRoot + "logmessage.html"
    });

    $routeProvider.when("/logHttp", {
        controller: "logHttpController",
        templateUrl: viewRoot + "loghttp.html"
    });

    $routeProvider.otherwise({ redirectTo: "/login" });
});

var serviceBase = '';
app.constant('ngAuthSettings', {
    apiServiceBaseUri: serviceBase,
    clientId: 'ngAuthApp'
});

app.config(function ($httpProvider) {
    $httpProvider.interceptors.push('authInterceptorService');

    if (!$httpProvider.defaults.headers.get) {
        $httpProvider.defaults.headers.get = {};
        $httpProvider.defaults.headers.get['If-Modified-Since'] = 'Mon, 26 Jul 1997 05:00:00 GMT';
        $httpProvider.defaults.headers.get['Cache-Control'] = 'no-cache';
        $httpProvider.defaults.headers.get['Pragma'] = 'no-cache';
    }
});

app.run(['authService', function (authService) {
    authService.fillAuthData();
}]);


'use strict';

(function () {
    var authInterceptorService = function ($rootScope,$q, $location, $injector, localStorageService) {

        var request = function (config) {
            config.headers = config.headers || {};
            var authData = localStorageService.get('authorizationData');
            if (authData) {
                config.headers.Authorization = 'Bearer ' + authData.token;
            }
            return config;
        }

        var responseError = function(rejection) {
            if (rejection.status === 401) {
                var authService = $injector.get('authService');
                authService.logOut();
                $location.path('/login');
            } else {
                var erroDetail = {
                    message: 'Unknown error, please use the error code ['
                        + rejection.headers('Http-Tracking-Id')
                        + '] to diagnose'
                };
                $rootScope.$broadcast('errorOccured', erroDetail);
            }
            return $q.reject(rejection);
        }

        return {
            request: request,
            responseError: responseError
        };
    };

    var app = angular.module('AngularAuthApp');
    app.factory('authInterceptorService', ['$rootScope','$q', '$location', '$injector', 'localStorageService', authInterceptorService]);
})();
'use strict';

(function() {
    var authServiceFactory = function ($http, $q, localStorageService, $log, ngAuthSettings) {
        var serviceBase = ngAuthSettings.apiServiceBaseUri;
     
        var authentication = {
            isAuth: false,
            userName: ""
        };

        var logOut = function() {
            localStorageService.remove('authorizationData');
            authentication.isAuth = false;
            authentication.userName = "";
        };

        var saveRegistration = function(registration) {
            logOut();
            return $http.post(serviceBase + 'api/account/register', registration).catch(function(err) {
                $log.error(err);
            });
        };

        var login = function (loginData) {
            var data = "grant_type=password&username=" + loginData.userName + "&password=" + loginData.password + "&client_id=default&client_secret=no-secret&scope=all";
            var headers = { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } };

            return $http.post(serviceBase + 'connect/token', data, headers)
            .then(function (response) {
                localStorageService.set('authorizationData', { token: response.data.access_token, userName: loginData.userName });
                authentication.isAuth = true;
                authentication.userName = loginData.userName;

            }).catch(function (err) {
                $log.error(err);
                logOut();
            });
        };

        var fillAuthData = function() {
            var authData = localStorageService.get('authorizationData');
            if (authData) {
                authentication.isAuth = true;
                authentication.userName = authData.userName;
            }
        };

        return {
            saveRegistration : saveRegistration,
            login : login,
            logOut : logOut,
            fillAuthData : fillAuthData,
            authentication : authentication
        };
    };
    
    var app = angular.module('AngularAuthApp');
    app.factory('authService', ['$http', '$q', 'localStorageService', '$log', 'ngAuthSettings', authServiceFactory]);
})();
'use strict';

(function () {
    var logServiceFactory = function ($http, $log, ngAuthSettings) {
        var serviceBase = ngAuthSettings.apiServiceBaseUri;

        var getLogLevels = function () {
            return $http.get(serviceBase + 'api/log/levels').catch(function (err) {
                $log.error(err);
            });
        };

        var getLoggers = function () {
            return $http.get(serviceBase + 'api/log/loggers').catch(function (err) {
                $log.error(err);
            });
        };

        var getLogMessages = function (sortAndPage) {
            return $http.post(serviceBase + 'api/log/logMessages', sortAndPage).catch(function (err) {
                $log.error(err);
            });
        };

        var getLogHttp = function (sortAndPage) {
            return $http.post(serviceBase + 'api/log/logHttp', sortAndPage).catch(function (err) {
                $log.error(err);
            });
        };

        return {
            getLogLevels: getLogLevels,
            getLoggers: getLoggers,
            getLogMessages: getLogMessages,
            getLogHttp: getLogHttp
        }
    };

    var app = angular.module('AngularAuthApp');
    app.factory('logService', ['$http','$log', 'ngAuthSettings', logServiceFactory]);
})();
'use strict';

(function () {
    var userServiceFactory = function ($http, $log, ngAuthSettings) {
        var serviceBase = ngAuthSettings.apiServiceBaseUri;

        var getUsers = function (sortAndPage) {
            return $http.post(serviceBase + 'api/Account/list', sortAndPage).catch(function (err) {
                $log.error(err);
            });
        };

        var deleteUser = function (userName) {
            return $http.delete(serviceBase + 'api/Account/' + userName).catch(function (err) {
                $log.error(err);
            });
        };

        return {
            getUsers: getUsers,
            deleteUser: deleteUser
        }
    };

    var app = angular.module('AngularAuthApp');
    app.factory('userService', ['$http','$log', 'ngAuthSettings', userServiceFactory]);
})();
'use strict';

(function () {
    var utilsServiceFactory = function ($log) {

        var dateToUtcFormat = function (date, format) {
            if (date == null)
                return '';

            var mDate;
            if (format == null) {
                mDate = moment(date);
            } else {
                mDate = moment(date, format);
            }
            var result = mDate.utc().format('YYYY-MM-DDTHH:mm:ss');

            if (result === 'Invalid date') {
                return '';
            }
            return result;
        };

        return {
            dateToUtcFormat: dateToUtcFormat
        };
    };

    var app = angular.module('AngularAuthApp');
    app.factory('utilsService', ['$log',utilsServiceFactory]);
})();
'use strict';

(function () {
    var app = angular.module('AngularAuthApp');
    app.directive('jsonFormatHeighlight', function () {
        return {
            restrict: 'A',
            link: function (scope, elem, attrs) {
                attrs.$observe('jsonFormatHeighlight', function (value) {
                    if (!value)
                        return;

                    var fixedStr = value.replace(/Bearer [^\s]*/g, "Bearer (token)");

                    try {
                        var formatted = vkbeautify.json(fixedStr);
                        var highlighted = hljs.highlight('JSON', formatted);
                        elem.html('<pre>' + highlighted.value + '</pre>');    
                    }
                    catch(e1) {
                        try {
                            var result = '';
                            var level = 0;

                            for (var i = 0; i < fixedStr.length; i++) {
                                var chr = fixedStr[i];
                                if (['{', '['].indexOf(chr) >= 0) {
                                    level++;
                                }
                                if (['}', ']'].indexOf(chr) >= 0) {
                                    level--;
                                }
                                if (['{', '}', '[', ']', ','].indexOf(chr) >= 0) {
                                    result += '\n';
                                    result += ' '.repeat(level);
                                }
                                result += chr;
                            }
                            elem.html('<pre>' + result + '</pre>');
                        } catch (e2) {
                            elem.html(fixedStr);
                        }
                    }
                });
            }
        };
    });
})();
'use strict';

(function() {
    var app = angular.module('AngularAuthApp');
    app.directive('sortHeader', function ($compile) {
        var getTemplate = function (sortData, sortField, headerText) {
            var template = "<th>" + headerText;
            if (sortData && sortData.OrderField && sortField
                && sortData.OrderField.toLowerCase() === sortField.toLowerCase()) {
                if (sortData.OrderDirection === 'Asc') {
                    template += "<i class='pull-right fa fa-sort-alpha-asc'>";
                }
                if (sortData.OrderDirection === 'Desc') {
                    template += "<i class='pull-right fa fa-sort-alpha-desc'>";
                }
            }
            template += "</th>";
            return template;
        };

        return {
            restrict: 'A',
            link: function (scope, elem, attrs) {
                function updateHeader() {
                    var sortData = scope.$eval(attrs['sortHeader']);
                    var sortField = attrs['sortField'];
                    var headerText = elem.text();

                    var el = $compile(getTemplate(sortData, sortField, headerText))(scope);
                    elem.html(el.html());
                };

                scope.$watchGroup([attrs['sortHeader'], attrs['sortHeader'] + '.OrderField'], function () {
                    updateHeader();
                });

                elem.on('click', function () {
                    var sortData = scope.$eval(attrs['sortHeader']);
                    sortData.OrderField = attrs['sortField'];

                    if (sortData.OrderDirection === 'None') {
                        sortData.OrderDirection = 'Asc';
                    } else if (sortData.OrderDirection === 'Asc') {
                        sortData.OrderDirection = 'Desc';
                    }
                    else {
                        sortData.OrderDirection = 'None';
                    }
                    updateHeader();
                    sortData.onChange();
                });

                updateHeader();
            }
        };
    });
})();
'use strict';

(function() {
    var app = angular.module('AngularAuthApp');
    app.directive('tablePager', function ($compile) {
        var getTemplate = function (sortData) {
            var template = '<uib-pagination class="pagination-sm top-margin-zero" ng-show="' + sortData + '.totalCount>' + sortData + '.PageSize" ' +
                'direction-links="true" boundary-links="true" total-items="' + sortData + '.totalCount" max-size="5" ' +
                'ng-model="' + sortData + '.PageNumber" items-per-page="' + sortData + '.PageSize" ' +
                'ng-change="' + sortData + '.onChange()"></uib-pagination>';
            return template;
        };

        return {
            restrict: 'A',
            link: function (scope, elem, attrs) {
                function updatePager() {
                    var sortData = attrs['tablePager'];

                    elem.html(getTemplate(sortData));
                    $compile(elem.contents())(scope);
                };

                scope.$watchGroup([attrs['tablePager']], function () {
                    updatePager();
                });

                updatePager();
            }
        };
    });
})();
'use strict';

(function () {
    var app = angular.module('AngularAuthApp');
    app.directive('utcView', function () {
        return {
            restrict: 'A',
            link: function (scope, elem, attrs) {
                attrs.$observe('utcView', function (value) {
                    var localTime = moment.utc(value).toDate();
                    localTime = moment(localTime).format('YYYY-MM-DD HH:mm:ss');
                    elem.text(localTime);
                });
            }
        };
    });
})();
'use strict';

(function () {
    var errorController = function ($rootScope, $scope) {
        $scope.errors = [];

        $rootScope.$on('errorOccured', function (evt,erroDetail) {
            $scope.errors.push(erroDetail);
        });
    };

    var app = angular.module('AngularAuthApp');
    app.controller('errorController', ['$rootScope', '$scope', errorController]);
})();
'use strict';

(function () {
    var homeController = function() {

    };

    var app = angular.module('AngularAuthApp');
    app.controller('homeController', [homeController]);
})();
'use strict';

(function () {
    var indexController = function ($scope, $location, authService) {

        $scope.logOut = function () {
            authService.logOut();
            $location.path('/home');
        };

        $scope.authentication = authService.authentication;

        if (authService.authentication.isAuth) {
            $location.path('/user');
        } else {
            $location.path('/login');
        }

    };

    var app = angular.module('AngularAuthApp');
    app.controller('indexController', ['$scope', '$location', 'authService', indexController]);
})();
'use strict';

(function () {
    var logHttpController = function ($scope, $q, logService, utilsService) {
        $scope.logs = [];
        $scope.showFromCalender = false;
        $scope.showToCalender = false;
        $scope.filter = { OrderField: 'CalledOn', OrderDirection: 'Desc', PageNumber: 1, PageSize: 100 };

        $scope.toggleFromCalender = function() {
            $scope.showFromCalender = !$scope.showFromCalender;
        };

        $scope.toggleToCalender = function () {
            $scope.showToCalender = !$scope.showToCalender;
        };

        var populateData = function () {
            $scope.filter.FromDate = utilsService.dateToUtcFormat($scope.filter._FromDate);
            $scope.filter.ToDate = utilsService.dateToUtcFormat($scope.filter._ToDate);

            $q.all([logService.getLogHttp($scope.filter).then(function (results) {
                $scope.logs = results.data.results;
                $scope.filter.totalCount = results.data.totalCount;
            }), logService.getLogLevels().then(function(results) {
                $scope.logLevels = results.data;
            })]);
        };
        populateData();
        $scope.filter.onChange = populateData;
    };

    var app = angular.module('AngularAuthApp');
    app.controller('logHttpController', ['$scope', '$q', 'logService', 'utilsService', logHttpController]);
})();
'use strict';

(function () {
    var loginController = function ($scope, $location, authService) {

        var reset = function () {
            $scope.message = "";
        };
        reset();

        $scope.loginData = {
            userName: "",
            password: ""
        };

        $scope.login = function () {
            reset();
            authService.login($scope.loginData)
                .then(function () {
                    $location.path('/user');
                },
                    function (err) {
                        $scope.message = err.error_description;
                    });
        };
    };

    var app = angular.module('AngularAuthApp');
    app.controller('loginController', ['$scope', '$location', 'authService', loginController]);
})();
'use strict';

(function () {
    var logMessageController = function ($scope, $q, logService, utilsService) {
        $scope.logs = [];
        $scope.showFromCalender = false;
        $scope.showToCalender = false;
        $scope.filter = { OrderField: 'LogTimestamp', OrderDirection: 'Desc', PageNumber: 1, PageSize: 100 };

        $scope.toggleFromCalender = function() {
            $scope.showFromCalender = !$scope.showFromCalender;
        };

        $scope.toggleToCalender = function () {
            $scope.showToCalender = !$scope.showToCalender;
        };

        var populateData = function () {
            $scope.filter.FromDate = utilsService.dateToUtcFormat($scope.filter._FromDate);
            $scope.filter.ToDate = utilsService.dateToUtcFormat($scope.filter._ToDate);

            $q.all([logService.getLogMessages($scope.filter).then(function (results) {
                $scope.logs = results.data.results;
                $scope.filter.totalCount = results.data.totalCount;
            }), logService.getLogLevels().then(function(results) {
                $scope.logLevels = results.data;
            }), logService.getLoggers().then(function (results) {
                $scope.loggers = results.data;
            })]);
        };
        populateData();
        $scope.filter.onChange = populateData;
    };

    var app = angular.module('AngularAuthApp');
    app.controller('logMessageController', ['$scope', '$q', 'logService', 'utilsService', logMessageController]);
})();
'use strict';

(function () {
    var signupController = function ($scope, $location, $timeout, authService) {

        var reset = function () {
            $scope.savedSuccessfully = false;
            $scope.message = "";
            $scope.successMessagge = "";
        };
        reset();

        $scope.registration = {
            userName: "",
            password: "",
            confirmPassword: ""
        };

        $scope.signUp = function () {
            reset();
            authService.saveRegistration($scope.registration).then(function () {
                var startTimer = function () {
                    var timer = $timeout(function () {
                        $timeout.cancel(timer);
                        $location.path('/login');
                    }, 2000);
                };

                $scope.savedSuccessfully = true;
                $scope.successMessagge = "User has been registered successfully, you will be redicted to login page in 2 seconds.";
                startTimer();
            },
            function (response) {
                var errors = [];
                for (var key in response.data.modelState) {
                    if (response.data.modelState.hasOwnProperty(key)) {
                        for (var i = 0; i < response.data.modelState[key].length; i++) {
                            errors.push(response.data.modelState[key][i]);
                        }
                    }
                }
                $scope.message = "Failed to register user due to:" + errors.join(' ');
            });
        };
    };

    var app = angular.module('AngularAuthApp');
    app.controller('signupController', ['$scope', '$location', '$timeout', 'authService', signupController]);
})();
'use strict';

(function () {
    var userController = function ($scope,$window, userService) {
        $scope.users = [];
        $scope.sortAndPage = { OrderField: 'UserName', OrderDirection: 'Asc', PageNumber: 1, PageSize: 10 };

        var populateData = function() {
            userService.getUsers($scope.sortAndPage).then(function (results) {
                $scope.users = results.data.results;
                $scope.sortAndPage.totalCount = results.data.totalCount;
            });
        };
        populateData();
        $scope.sortAndPage.onChange = populateData; 

        $scope.deleteUser = function (userName) {
            if ($window.confirm("Are you sure you want to delete this user?")) {
                userService.deleteUser(userName).then(function () {
                    for (var i = 0; i < $scope.users.length; i++) {
                        if ($scope.users[i].userName === userName) {
                            $scope.users.splice(i, 1);
                            break;
                        }
                    }
                });
            };
        };
    };

    var app = angular.module('AngularAuthApp');
    app.controller('userController', ['$scope','$window', 'userService', userController]);
})();