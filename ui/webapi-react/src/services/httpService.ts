import axios from "axios";
import Cookies from "js-cookie";

import { AuthService } from "./authService";

export class HttpService {
    authService: AuthService;
    serviceBase: string;

    constructor() {
        this.serviceBase = '../';
        this.authService = new AuthService();
    }

    public get = (url: string, success?: Function, error?: Function): void => {
        axios.get(this.serviceBase + url, {
            headers: this.getHeaders()
        }).then(function (result: any) {
            if (success) {
                success(result.data);
            }
        }).catch(function (error: any) {
            if (error) {
                error(`Error while calling API [status : ${error?.request?.status}, error : ${error}]`);
            }
        });
    }

    public post = (url: string, data: any, success?: Function, error?: Function): void => {
        axios.post(this.serviceBase + url, data, {
            headers: this.getHeaders()
        }).then(function (result: any) {
            if (success) {
                success(result.data);
            }
        }).catch(function (error: any) {
            if (error) {
                error(`Error while calling API [status : ${error?.request?.status}, error : ${error}]`);
            }
        });
    }

    public delete = (url: string, data: any, success?: Function, error?: Function): void => {
        axios.delete(this.serviceBase + url, {
            headers: this.getHeaders()
        }).then(function (result: any) {
            if (success) {
                success(result.data);
            }
        }).catch(function (error: any) {
            if (error) {
                error(`Error while calling API [status : ${error?.request?.status}, error : ${error}]`);
            }
        });
    }

    private getHeaders = () => {
        const xsrfToken = Cookies.get("XSRF-TOKEN");
        const auth: any = this.authService.getAuth();

        return {
            "Content-Type": "application/json",
            "XSRF-TOKEN": xsrfToken,
            "Authorization": `Bearer ${auth.token}`
        };
    }
}