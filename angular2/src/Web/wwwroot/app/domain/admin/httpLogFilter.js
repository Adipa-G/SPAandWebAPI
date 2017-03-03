System.register(["../common/OrderAndPage"], function (exports_1, context_1) {
    "use strict";
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var __moduleName = context_1 && context_1.id;
    var OrderAndPage_1, HttpLogFilter;
    return {
        setters: [
            function (OrderAndPage_1_1) {
                OrderAndPage_1 = OrderAndPage_1_1;
            }
        ],
        execute: function () {
            HttpLogFilter = (function (_super) {
                __extends(HttpLogFilter, _super);
                function HttpLogFilter() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                return HttpLogFilter;
            }(OrderAndPage_1.OrderAndPage));
            exports_1("HttpLogFilter", HttpLogFilter);
        }
    };
});

//# sourceMappingURL=httpLogFilter.js.map
