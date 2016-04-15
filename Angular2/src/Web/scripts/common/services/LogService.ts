import {Injectable} from 'angular2/core';

@Injectable()
export class LogService {
    public log(logMsg:string) {
        console.log(logMsg);
    }
}