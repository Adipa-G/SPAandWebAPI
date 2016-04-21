import {Injectable} from 'angular2/core';
import {EventEmitter} from 'angular2/core';
import {Router } from 'angular2/router';

import {ErrorInfo} from '../../domain/ErrorInfo';

import {LogService} from './LogService';

@Injectable()
export class ErrorService {
    public errorOccured$: EventEmitter<ErrorInfo>;
    
    constructor(private router: Router,
        private logService: LogService) {
        this.router = router;
        this.logService = logService;

        this.errorOccured$ = new EventEmitter<ErrorInfo>();
    }

    public logError(errInfo : ErrorInfo) {
        this.errorOccured$.emit(errInfo);
    }

    public handleHttpError(error) {
        if (error.status === 401) {
            this.router.navigate(['Login']);
        }
        else {
            this.logService.log(JSON.stringify(error));
            this.logError(new ErrorInfo(JSON.stringify(error)));
        }
    }
}