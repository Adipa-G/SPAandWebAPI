declare var Cookies: any;
declare var document: any;

import * as JQuery from "jquery";
import {AuthService} from "./authService"

export class AjaxInterceptorService {
    xsrfTokenName: string = "XSRF-TOKEN";
    bearerTokenName: string = "Authorization";
    bearerTokenPrefix: string = "Bearer";

    authService: AuthService;

    constructor() {
        this.authService = new AuthService();
    }

    public init= ():void => {
        $.ajaxPrefilter((options:any, originalOptions:any, jqXHR:any) => {
            if (!options.beforeSend) {
                options.beforeSend = (xhr: any) => {
                    let xsrfToken: string = Cookies.get(this.xsrfTokenName);
                    let auth: any = this.authService.getAuth();

                    xhr.setRequestHeader(`X-${this.xsrfTokenName}`, xsrfToken);
                    if (auth.isAuth && auth.token) {
                        xhr.setRequestHeader(this.bearerTokenName, `${this.bearerTokenPrefix} ${auth.token}`);
                    }
                }
            }

            jqXHR.fail(() => {
                if (jqXHR.status === 401) {
                    this.authService.logOff();
                    document.location.reload();
                }
            });
        });
    }
}