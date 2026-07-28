import { Component, OnDestroy, inject, ChangeDetectionStrategy, signal } from '@angular/core';
import { timer } from 'rxjs';

import { ErrorInfo } from '../../domain/errorInfo';

import { ErrorService } from '../services/errorService';

@Component({
    selector: 'app-common-error',
    templateUrl: './errorComponent.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true
})

export class ErrorComponent implements OnDestroy {
    private errorService = inject(ErrorService);

    currentErrors = signal<ErrorInfo[]>([]);
    subscription: any;

    constructor() {
        const errorService = this.errorService;

        this.subscription = errorService.errorOccured$.subscribe(error => this.onError(error));
        const t = timer(10000, 10000);
        t.subscribe(() => this.currentErrors.update(errors => errors.slice(0, -1)));
    }

    onError(error: ErrorInfo): void {
        this.currentErrors.update(errors => [...errors, error]);
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}