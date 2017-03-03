import { Injectable, Inject } from '@angular/core';

import { LogService } from './LogService';

@Injectable()
export class StorageService {
    private logService: LogService;

    constructor( @Inject(LogService) logService: LogService) {
        this.logService = logService;
    }

    public getCookie(name): string {
        let value = "; " + document.cookie;
        let parts = value.split("; " + name + "=");
        if (parts.length === 2) {
            return parts.pop().split(";").shift();
        }
        return null;
    }

    public getLocalStorage<T>(key: string): T {
        var text: any = localStorage.getItem(key);
        var data: T;
        try {
            data = <T>JSON.parse(text);
        } catch (error) {
            this.logService.log("LocalStorageService::readObject: can't convert string from local storage" +
                " to object using JSON.parse(). Error: " + error);
            data = null;
        }
        return data;
    }

    public setLocalStorage(key: string, value: any) {
        localStorage.setItem(key, JSON.stringify(value));
    }
}