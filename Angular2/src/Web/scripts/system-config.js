System.config({
    map: {
        '@angular': 'libs/angular',
        'rxjs':'libs/rxjs/Rx.js'
    },
    packages: {
        '@angular/core': { main: 'core.umd.js' },
        '@angular/http': { main: 'http.umd.js' },
        '@angular/common': { main: 'common.umd.js' },
        '@angular/compiler': { main: 'compiler.umd.js' },
        '@angular/router': { main: 'router.umd.js' },
        '@angular/platform-browser': { main: 'platform-browser.umd.js' },
        '@angular/platform-browser-dynamic': { main: 'platform-browser-dynamic.umd.js' },
        appScripts: {
            main: 'app',
            format: 'register',
            defaultExtension: 'js'
        }
    }
});