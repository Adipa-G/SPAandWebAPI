import {Injectable} from '@angular/core';

@Injectable()
export class Constants {
    public getServiceBaseUrl(): string {
        return '';
    }

    public getShortDateFormat(): string {
        return 'YYYY-MM-DD';
    }

    public getServerDateFormat(): string {
        return 'YYYY-MM-DDTHH:mm:ss';
    }
}