import axios from "axios";
import Cookies from "js-cookie";

import { StorageService } from "./storageService";

export class AuthService {
    serviceBase: string;
    authStorageKey: string;
    storageService: StorageService;

    constructor() {
        this.serviceBase = '../';
        this.authStorageKey = 'auth_data';
        this.storageService = new StorageService();
    }

    authenticate = (userName: string, password: string, callback: Function): void => {
        const url = this.serviceBase + 'connect/token';
        const data = `grant_type=password&username=${userName}&password=${password}&client_id=default&client_secret=no-secret&scope=all`;
        const xsrfToken = Cookies.get("XSRF-TOKEN");

        var self = this;
        axios.post(url, data, {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "XSRF-TOKEN": xsrfToken
            }
        }).then(function (result: any) {
            debugger;
            let auth = { isAuth: true, userName: userName, token: result.data.access_token };
            self.storageService.set(self.authStorageKey, auth);
            callback({ success: true });
        }).catch(function (error: any) {
            self.storageService.set(self.authStorageKey, "");
            callback({ success: false, error: `Error while auth [status : ${error?.response?.status}, error : ${error}]` });
        });
    }

    signup = (userName: string, password: string, callback: Function): void => {
        const url = this.serviceBase + 'api/account/register';
        const data: any = { UserName: userName, Password: password, ConfirmPassword: password };
        const xsrfToken = Cookies.get("XSRF-TOKEN");

        axios.post(url, data, {
            headers: {
                "Content-Type": "application/json",
                "XSRF-TOKEN": xsrfToken
            }
        }).then(function () {
            callback({ success: true });
        }).catch(function (error: any) {
            callback({ success: false, error: error });
        });
    }

    logOff = (): void => {
        this.storageService.set(this.authStorageKey, "");
    }

    getAuth = () => {
        let auth: any = this.storageService.get(this.authStorageKey);
        return auth || { isAuth: false, userName: "" };
    }
}