System.config({
    map: {
        'angular-local-storage': 'lib/angular-local-storage.js',
        'angular-route': 'lib/angular-route.js',
        'angular': 'lib/angular.js',
        'bootstrap': 'lib/bootstrap.js',
        'jquery': 'lib/jquery-2.2.4.js',
        'loading-bar': 'lib/loading-bar.js',
        'ngFormValidator': 'lib/ngFormValidator.1.4.1.0.js',
        'ui-bootstrap': 'lib/ui-bootstrap-tpls-0.14.3.js',
        'app' : 'app/app.js'
    },
    meta: {
        'angular': {
            deps: [
                'jquery'
            ]
        },
        'angular-local-storage': {
            deps: [
                'angular'
            ]
        },
        'angular-route': {
            deps: [
                'angular'
            ]
        },
        'ngFormValidator': {
            deps: [
                'angular'
            ]
        },
        'ui-bootstrap': {
            deps: [
                'angular'
            ]
        },
        'app': {
            deps: [
                'jquery',
                'angular',
                'angular-local-storage',
                'angular-route',
                'bootstrap',
                'loading-bar',
                'ngFormValidator',
                'ui-bootstrap',
            ]
        }
    },
    packages: {
        appScripts: { main: 'app', format: 'register', defaultExtension: 'js' }
    }
});