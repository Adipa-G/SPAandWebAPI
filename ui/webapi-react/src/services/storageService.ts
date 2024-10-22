declare var localStorage: any;
declare var JSON: any;

export class StorageService {

    public get = (key: string): any => {
        var value = localStorage.getItem(key);
        if (value) {
            return JSON.parse(value);
        }
        return "";
    }

    public set = (key: string, value: any) => {
        if (value) {
            value = JSON.stringify(value);
        }
        localStorage.setItem(key, value);
    }
}