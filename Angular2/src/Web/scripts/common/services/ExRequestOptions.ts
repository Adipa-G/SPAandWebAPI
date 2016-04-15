import {Injectable, provide} from 'angular2/core';
import {Headers,BaseRequestOptions, RequestOptions} from 'angular2/http';

@Injectable()
export class ExRequestOptions extends BaseRequestOptions {
    constructor() {
        super();
        headers: new Headers({
            'Content-Type': 'application/json',
            'XSRF-TOKEN': this.getCookie('XSRF-TOKEN')
        });
    }

    private getCookie(name) : string {
        let value = "; " + document.cookie;
        let parts = value.split("; " + name + "=");
        if (parts.length == 2)
            return parts.pop().split(";").shift();
    }
}