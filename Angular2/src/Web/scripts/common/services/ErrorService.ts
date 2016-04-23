import {Injectable} from 'angular2/core';
import {EventEmitter} from 'angular2/core';

import {ErrorInfo} from '../../domain/ErrorInfo';

import {LogService} from './LogService';

@Injectable()
export class ErrorService {
    public errorOccured$: EventEmitter<ErrorInfo>;
    public authErrorOccured$: EventEmitter<ErrorInfo>;
    
    constructor(private logService: LogService) {
        this.logService = logService;

        this.errorOccured$ = new EventEmitter<ErrorInfo>();
        this.authErrorOccured$ = new EventEmitter<ErrorInfo>();
    }

    public logError(errInfo: ErrorInfo) {
        this.logService.log('Error: ' + errInfo.message);
        this.errorOccured$.emit(errInfo);
    }

    public handleHttpError(error) {
        var errorInfo = new ErrorInfo(JSON.stringify(error));
        
        if (error.status === 401) {
            this.logService.log(JSON.stringify(error));
            this.authErrorOccured$.emit(errorInfo);
        } else {
            this.logError(errorInfo);  
        }
    }
}