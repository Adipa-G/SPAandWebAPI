import { Component } from '@angular/core';
import { timer } from 'rxjs/Observable/timer';

import { ErrorInfo } from '../../domain/ErrorInfo';

import { ErrorService } from '../services/ErrorService';

@Component({
    selector: 'common-error',
    templateUrl: './app/common/components/errorComponent.html'
})

export class ErrorComponent {
    private currentErrors: ErrorInfo[] = new Array();
    private subscription: any;

    constructor(private errorService: ErrorService) {
        this.subscription = errorService.errorOccured$.subscribe(error => this.onError(error));
        let t = timer(10000, 10000);
        t.subscribe(t => this.currentErrors.splice(this.currentErrors.length - 1, 1));
    }

    private onError(error: ErrorInfo): void {
        this.currentErrors.push(error);
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}