import {Injectable} from '@angular/core';

@Injectable()
export class Constants {
    public getServiceBaseUrl(): string {
        return '';
    }

    public getShortDateFormat(): string {
        return 'yyyy-MM-dd';
    }

    public getServerDateFormat(): string {
        return "yyyy-MM-dd'T'HH:mm:ss";
    }
}