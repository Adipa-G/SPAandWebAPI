import { Component } from '@angular/core';
import { timer } from 'rxjs/observable/timer';

import { ErrorInfo } from '../../domain/errorInfo';

import { ErrorService } from '../services/errorService';

@Component({
    selector: 'common-error',
    templateUrl: './app/common/components/errorComponent.html'
})

export class ErrorComponent {
    currentErrors: ErrorInfo[] = new Array();
    subscription: any;

    constructor(private errorService: ErrorService) {
        this.subscription = errorService.errorOccured$.subscribe(error => this.onError(error));
        let t = timer(10000, 10000);
        t.subscribe(t => this.currentErrors.splice(this.currentErrors.length - 1, 1));
    }

    onError(error: ErrorInfo): void {
        this.currentErrors.push(error);
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}