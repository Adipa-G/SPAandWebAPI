System.config({
    map: {
        'angular-local-storage': 'web/lib/angular-local-storage.js',
        'angular-route': 'web/lib/angular-route.js',
        'angular': 'web/lib/angular.js',
        'bootstrap': 'web/lib/bootstrap.js',
        'jquery': 'web/lib/jquery-2.2.4.js',
        'loading-bar': 'web/lib/loading-bar.js',
        'ngFormValidator': 'web/lib/ngFormValidator.1.4.1.0.js',
        'ui-bootstrap': 'web/lib/ui-bootstrap-tpls-0.14.3.js',
        'app' : 'web/app/app.js'
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