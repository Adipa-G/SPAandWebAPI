System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var ErrorInfo;
    return {
        setters: [],
        execute: function () {
            ErrorInfo = (function () {
                function ErrorInfo(message) {
                    this.message = message;
                }
                return ErrorInfo;
            }());
            exports_1("ErrorInfo", ErrorInfo);
        }
    };
});

//# sourceMappingURL=errorInfo.js.map
