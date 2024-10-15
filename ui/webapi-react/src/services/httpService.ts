import axios, { AxiosError, AxiosResponse } from "axios";
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
        }).then(function (result: AxiosResponse) {
            if (success) {
                success(result.data);
            }
        }).catch(function (ex: AxiosError) {
            if (error) {
                error(`Error while calling API [status : ${ex?.request?.status}, error : ${ex.message}]`);
            }
        });
    }

    public post = (url: string, data: any, success?: Function, error?: Function): void => {
        axios.post(this.serviceBase + url, data, {
            headers: this.getHeaders()
        }).then(function (result: AxiosResponse) {
            if (success) {
                success(result.data);
            }
        }).catch(function (ex: AxiosError) {
            if (error) {
                error(`Error while calling API [status : ${ex?.request?.status}, error : ${ex.message}]`);
            }
        });
    }

    public delete = (url: string, data: any, success?: Function, error?: Function): void => {
        axios.delete(this.serviceBase + url, {
            headers: this.getHeaders()
        }).then(function (result: AxiosResponse) {
            if (success) {
                success(result.data);
            }
        }).catch(function (ex: AxiosError) {
            if (error) {
                error(`Error while calling API [status : ${ex?.request?.status}, error : ${ex.message}]`);
            }
        });
    }

    private getHeaders = () => {
        const xsrfToken = Cookies.get("XSRF-TOKEN");
        const auth: any = this.authService.getAuth();

        return {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "XSRF-TOKEN": xsrfToken,
            "Authorization": `Bearer ${auth.token}`
        };
    }
}