import {Injectable} from 'angular2/core';
import {EventEmitter} from 'angular2/core';
import {ErrorInfo} from '../../domain/ErrorInfo';

@Injectable()
export class ErrorService {
    public errorOccured$: EventEmitter<ErrorInfo>;
    
    constructor() {
        this.errorOccured$ = new EventEmitter<ErrorInfo>();
    }

    public logError(errInfo : ErrorInfo) {
        this.errorOccured$.emit(errInfo);
    }
}