import * as React from "react";
import * as ReactDOM from "react-dom";

import { AjaxInterceptorService } from "./services/ajaxInterceptor";

import {Layout} from "./components/layout";

let interceptor = new AjaxInterceptorService();
interceptor.init();

ReactDOM.render(
    <Layout />,
    document.getElementById('root')
);