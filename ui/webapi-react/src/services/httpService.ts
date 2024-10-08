import * as jQuery from "jquery";

declare var JSON: any;

export class HttpService {
    serviceBase: string;

    constructor() {
        this.serviceBase = '../';
    }

    public get = (url: string, success?: Function, error?: Function): void => {
        this.request(url, "GET", null, success, error);
    }

    public post = (url: string, data: any, success?: Function, error?: Function): void => {
        this.request(url, "POST", data, success, error);
    }

    public delete = (url: string, data: any, success?: Function, error?: Function): void => {
        this.request(url, "DELETE", data, success, error);
    }

    private request = (url: string, type: string, data: any, success?: Function, error?: Function): void => {
        jQuery.ajax({
            url: `${this.serviceBase}${url}`,
            type: type,
            data: data ? JSON.stringify(data) : 'null',
            contentType: "application/json; charset=utf-8"
        }).done((result: any) => {
            if (success) {
                success(result);
            }
        }).fail((xhr: any, err: any) => {
            if (error) {
                error(`Error while calling API [status : ${xhr.status}, error : ${err}]`);
            }
        });
    }
}