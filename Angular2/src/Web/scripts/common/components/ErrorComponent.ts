import {Component} from 'angular2/core';

import {ErrorInfo} from '../../domain/ErrorInfo';

import {ErrorService} from '../services/ErrorService';

@Component({
    selector: 'common-error',
    templateUrl: './templates/common/components/ErrorComponent.html'
})

export class ErrorComponent {
    private currentError: ErrorInfo;
    private subscription:any;

    constructor(private errorService: ErrorService) {
        this.subscription = errorService.errorOccured$.subscribe(error => this.onError(error));
        this.currentError = new ErrorInfo('');
    }

    private onError(error: ErrorInfo): void {
        this.currentError = error;
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}