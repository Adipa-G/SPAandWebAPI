import {Component} from 'angular2/core';
import {ErrorInfo} from '../../domain/ErrorInfo';
import {ErrorService} from '../services/ErrorService';

@Component({
    selector: 'common-error',
    viewProviders: [ErrorService],
    templateUrl: './templates/common/components/ErrorComponent.html'
})

export class ErrorComponent {
    private currentError : ErrorInfo;

    constructor(private errorService: ErrorService) {
        errorService.errorOccured$.subscribe(error => this.onError(error));
        this.currentError = new ErrorInfo();
        this.currentError.message = '';
    }

    private onError(error: ErrorInfo): void {
        this.currentError = error;
    }
}