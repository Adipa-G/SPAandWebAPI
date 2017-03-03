System.register(["../common/OrderAndPage"], function (exports_1, context_1) {
    "use strict";
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var __moduleName = context_1 && context_1.id;
    var OrderAndPage_1, LogMessageFilter;
    return {
        setters: [
            function (OrderAndPage_1_1) {
                OrderAndPage_1 = OrderAndPage_1_1;
            }
        ],
        execute: function () {
            LogMessageFilter = (function (_super) {
                __extends(LogMessageFilter, _super);
                function LogMessageFilter() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                return LogMessageFilter;
            }(OrderAndPage_1.OrderAndPage));
            exports_1("LogMessageFilter", LogMessageFilter);
        }
    };
});

//# sourceMappingURL=logMessageFilter.js.map
