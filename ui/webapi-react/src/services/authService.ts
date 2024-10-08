import * as jQuery from "jquery";

import { HttpService } from "./httpService";
import { StorageService } from "./storageService";

export class AuthService {
    serviceBase: string;
    authStorageKey: string;
    httpService: HttpService;
    storageService: StorageService;

    constructor() {
        this.serviceBase = '../';
        this.authStorageKey = 'auth_data';
        this.httpService = new HttpService();
        this.storageService = new StorageService();
    }

    authenticate = (userName: string, password: string, callback: Function): void => {
        let data = `grant_type=password&username=${userName}&password=${password}&client_id=default&client_secret=no-secret&scope=all`;

        jQuery.ajax({
            url: this.serviceBase + 'connect/token',
            type: "POST",
            data: data,
            contentType: 'application/x-www-form-urlencoded'
        }).done((result: any) => {
            let auth = { isAuth: true, userName: userName, token: result.access_token };
            this.storageService.set(this.authStorageKey, auth);

            callback({ success: true });
        }).fail((xhr: any, err: any) => {
            this.storageService.set(this.authStorageKey, "");
            callback({ success: false, error: `Error while auth [status : ${xhr.status}, error : ${err}]` });
        });
    }

    signup = (userName: string, password: string, callback: Function): void => {
        let data: any = { UserName: userName, Password: password, ConfirmPassword: password };

        this.httpService.post('api/account/register',
            data,
            () => {
                callback({ success: true });
            },
            (error: any) => {
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