import {Component} from 'angular2/core';
import {Observable} from 'rxjs/Rx';

import {ErrorInfo} from '../../domain/ErrorInfo';

import {ErrorService} from '../services/ErrorService';


@Component({
    selector: 'common-error',
    templateUrl: './templates/common/components/ErrorComponent.html'
})

export class ErrorComponent {
    private currentErrors : ErrorInfo[] = new Array();
    private subscription:any;

    constructor(private errorService: ErrorService) {
        this.subscription = errorService.errorOccured$.subscribe(error => this.onError(error));
        let timer = Observable.timer(10000, 10000);
        timer.subscribe(t => this.currentErrors.splice(this.currentErrors.length - 1,1));
    }

    private onError(error: ErrorInfo): void {
        this.currentErrors.push(error);
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}