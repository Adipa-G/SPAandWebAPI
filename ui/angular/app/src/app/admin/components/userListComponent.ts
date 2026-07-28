import { Component, inject, ChangeDetectionStrategy, signal } from '@angular/core';

import { OrderAndPage } from '../../domain/common/orderAndPage';
import { UserInfo } from '../../domain/admin/userInfo';

import { ErrorService } from '../../common/services/errorService';
import { UserService } from '../services/userService';

import { SortHeader } from '../../common/directives/sortHeader';
import { Pagination } from '../../common/directives/pagination';

@Component({
    selector: 'app-admin-users',
    templateUrl: './userListComponent.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [SortHeader, Pagination]
})

export class UserListComponent {
    private errorService = inject(ErrorService);
    private userService = inject(UserService);

    orderAndPage: OrderAndPage;
    errorMessage = signal('');
    users = signal<UserInfo[]>([]);
    totalCount = signal(0);

    constructor() {
        const errorService = this.errorService;
        const userService = this.userService;

        this.errorService = errorService;
        this.userService = userService;

        this.orderAndPage = this.initOrderAndPagingDetails();
        this.updateView(this.orderAndPage);
    }

    updateView(orderAndPage: OrderAndPage) {
        this.orderAndPage = orderAndPage;
        this.userService.getUsers(this.orderAndPage).subscribe({
            next: (data: any) => {
                this.users.set(data.results);
                this.totalCount.set(data.totalCount);
            },
            error: (err) => {
                this.errorMessage.set(JSON.stringify(err));
                this.errorService.handleHttpError(err);
            }
        });
    }

    initOrderAndPagingDetails(): OrderAndPage {
        const orderAndPage: OrderAndPage = new OrderAndPage();
        orderAndPage.orderField = 'UserName';
        orderAndPage.orderDirection = 'Asc';
        orderAndPage.pageNumber = 1;
        orderAndPage.pageSize = 5;
        return orderAndPage;
    }

    deleteUser(userName: string): void {
        this.userService.deleteUser(userName).subscribe({
            complete: () => {
                const idx = this.users().findIndex(u => u.userName === userName);
                if (idx >= 0) {
                    const updatedUsers = [...this.users()];
                    updatedUsers.splice(idx, 1);
                    this.users.set(updatedUsers);
                    this.totalCount.update(count => count - 1);
                }
            },
            error: (err) => {
                this.errorMessage.set(JSON.stringify(err));
                this.errorService.handleHttpError(err);
            }
        });
    }
}