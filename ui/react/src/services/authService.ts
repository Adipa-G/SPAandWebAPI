import axios, { AxiosError, AxiosResponse } from "axios";
import Cookies from "js-cookie";

import { StorageService } from "./storageService";
import { CallbackFunction } from "./serviceModels";

interface AuthResultData {
    access_token: string
}

interface SignupRequest {
    userName: string,
    password: string,
    confirmPassword: string
}

export interface AuthInStorage {
    isAuth: boolean,
    userName: string,
    token: string
}

export class AuthService {
    serviceBase: string;
    authStorageKey: string;
    storageService: StorageService;

    constructor() {
        this.serviceBase = '../';
        this.authStorageKey = 'auth_data';
        this.storageService = new StorageService();
    }

    authenticate = (userName: string, password: string, callback: CallbackFunction): void => {
        const url = this.serviceBase + 'connect/token';
        const data = `grant_type=password&username=${userName}&password=${password}&client_id=default&scope=openid`;
        const xsrfToken = Cookies.get("XSRF-TOKEN");

        var self = this;
        axios.post(url, data, {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "XSRF-TOKEN": xsrfToken
            }
        }).then(function (result: AxiosResponse<AuthResultData>) {
            let auth: AuthInStorage = { isAuth: true, userName: userName, token: result.data.access_token };
            self.storageService.set(self.authStorageKey, auth);
            callback({
                success: true,
                data: null,
                totalCount: 0,
                error: ""
            });
        }).catch(function (error: AxiosError) {
            self.storageService.set(self.authStorageKey, "");
            callback({
                success: false,
                error: `Error while auth [status : ${error?.response?.status}, error : ${error}]`,
                data: null,
                totalCount: 0
            });
        });
    }

    signup = (userName: string, password: string, callback: CallbackFunction): void => {
        const url = this.serviceBase + 'api/account/register';
        const data: SignupRequest = { userName: userName, password: password, confirmPassword: password };
        const xsrfToken = Cookies.get("XSRF-TOKEN");

        axios.post(url, data, {
            headers: {
                "Content-Type": "application/json",
                "XSRF-TOKEN": xsrfToken
            }
        }).then(function () {
            callback({
                success: true,
                data: null,
                totalCount: 0,
                error: ""
            });
        }).catch(function (error: AxiosError) {
            callback({
                success: false,
                error: error.message,
                data: null,
                totalCount: 0
            });
        });
    }

    logOff = (): void => {
        this.storageService.set(this.authStorageKey, "");
    }

    getAuth = (): AuthInStorage => {
        let auth: any = this.storageService.get(this.authStorageKey);
        return auth || { isAuth: false, userName: "" };
    }
}