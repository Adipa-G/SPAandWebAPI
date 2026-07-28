import { Component, OnInit, inject, ChangeDetectionStrategy } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

import { MenuComponent } from './common/components/menuComponent';
import { ErrorComponent } from './common/components/errorComponent';

@Component({
    selector: 'app-root',
    templateUrl: './app.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [RouterOutlet, MenuComponent, ErrorComponent]
})

export class AppComponent implements OnInit {
    private router = inject(Router);

    ngOnInit() {
        this.router.navigate(['/home']);
    }
}