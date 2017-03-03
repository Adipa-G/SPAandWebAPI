System.register(["@angular/router", "./common/components/homeComponent", "./common/components/loginComponent", "./common/components/registerComponent", "./admin/components/userListComponent", "./admin/components/httpLogComponent", "./admin/components/logMessagesComponent"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var router_1, homeComponent_1, loginComponent_1, registerComponent_1, userListComponent_1, httpLogComponent_1, logMessagesComponent_1, appRoutes, appRoutingProviders, routing;
    return {
        setters: [
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (homeComponent_1_1) {
                homeComponent_1 = homeComponent_1_1;
            },
            function (loginComponent_1_1) {
                loginComponent_1 = loginComponent_1_1;
            },
            function (registerComponent_1_1) {
                registerComponent_1 = registerComponent_1_1;
            },
            function (userListComponent_1_1) {
                userListComponent_1 = userListComponent_1_1;
            },
            function (httpLogComponent_1_1) {
                httpLogComponent_1 = httpLogComponent_1_1;
            },
            function (logMessagesComponent_1_1) {
                logMessagesComponent_1 = logMessagesComponent_1_1;
            }
        ],
        execute: function () {
            appRoutes = [
                { path: '', redirectTo: 'home', pathMatch: 'full' },
                { path: 'home', component: homeComponent_1.HomeComponent },
                { path: 'login', component: loginComponent_1.LoginComponent },
                { path: 'register', component: registerComponent_1.RegisterComponent },
                { path: 'userList', component: userListComponent_1.UserListComponent },
                { path: 'httpLog', component: httpLogComponent_1.HttpLogComponent },
                { path: 'logMessages', component: logMessagesComponent_1.LogMessagesComponent }
            ];
            exports_1("appRoutingProviders", appRoutingProviders = []);
            exports_1("routing", routing = router_1.RouterModule.forRoot(appRoutes, { useHash: true }));
        }
    };
});

//# sourceMappingURL=app.routing.js.map
