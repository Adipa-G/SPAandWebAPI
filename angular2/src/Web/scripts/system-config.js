System.config({
    map: {
        '@angular': 'libs/angular',
        'rxjs':'libs/rxjs/Rx.js.gz',
        'moment':'libs/moment.js.gz'
    },
    packages: {
        '@angular/core': { main: 'core.umd.js.gz', defaultExtension: 'gz' },
        '@angular/http': { main: 'http.umd.js.gz', defaultExtension: 'gz' },
        '@angular/common': { main: 'common.umd.js.gz', defaultExtension: 'gz' },
        '@angular/compiler': { main: 'compiler.umd.js.gz', defaultExtension: 'gz' },
        '@angular/router': { main: 'router.umd.js', defaultExtension: 'gz' },
        '@angular/platform-browser': { main: 'platform-browser.umd.js.gz', defaultExtension: 'gz' },
        '@angular/platform-browser-dynamic': { main: 'platform-browser-dynamic.umd.js.gz', defaultExtension: 'gz' },
        appScripts: {main: 'app',format: 'register',defaultExtension: 'js'}
    }
});