import { Component } from '@angular/core';
import { timer } from 'rxjs';

import { ErrorInfo } from '../../domain/errorInfo';

import { ErrorService } from '../services/errorService';

@Component({
    selector: 'common-error',
    templateUrl: './errorComponent.html',
    standalone: false
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