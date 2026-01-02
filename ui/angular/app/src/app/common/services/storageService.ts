import { Injectable, inject } from '@angular/core';

import { LogService } from './logService';

@Injectable()
export class StorageService {
    private logService: LogService;

    constructor() {
        const logService = inject<LogService>(LogService);

        this.logService = logService;
    }

    public getCookie(name): string {
        const value = "; " + document.cookie;
        const parts = value.split("; " + name + "=");
        if (parts.length === 2) {
            return parts.pop().split(";").shift();
        }
        return null;
    }

    public getLocalStorage<T>(key: string): T {
        const text: any = localStorage.getItem(key);
        let data: T;
        try {
            data = JSON.parse(text) as T;
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