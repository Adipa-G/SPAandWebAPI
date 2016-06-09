import {Injectable} from '@angular/core';

@Injectable()
export class LogService {
    public log(logMsg:string) {
        console.log(logMsg);
    }
}