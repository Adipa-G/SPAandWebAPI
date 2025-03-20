import { Component } from '@angular/core';

import { OrderAndPage } from '../../domain/common/orderAndPage';
import { UserInfo } from '../../domain/admin/userInfo';

import { ErrorService } from '../../common/services/errorService';
import { UserService } from '../services/userService';

@Component({
    selector: 'admin-users',
    templateUrl: './userListComponent.html',
    standalone: false
})

export class UserListComponent {
    orderAndPage: OrderAndPage;
    errorMessage: string;
    users: UserInfo[];
    totalCount: number;

    constructor(private errorService: ErrorService, private userService: UserService) {
        this.errorService = errorService;
        this.userService = userService;
        this.users = [];
        this.totalCount = 0;

        this.orderAndPage = this.initOrderAndPagingDetails();
        this.updateView(this.orderAndPage);
    }

    updateView(orderAndPage: OrderAndPage) {
        this.orderAndPage = orderAndPage;
        this.userService.getUsers(this.orderAndPage).subscribe({
            next: (data: any) => {
                this.users = data.results;
                this.totalCount = data.totalCount;
            },
            error: (err) => {
                this.errorMessage = JSON.stringify(err);
                this.errorService.handleHttpError(err);
            }
        });
    }

    initOrderAndPagingDetails(): OrderAndPage {
        var orderAndPage: OrderAndPage = new OrderAndPage();
        orderAndPage.orderField = 'UserName';
        orderAndPage.orderDirection = 'Asc';
        orderAndPage.pageNumber = 1;
        orderAndPage.pageSize = 5;
        return orderAndPage;
    }

    deleteUser(userName: string): void {
        this.userService.deleteUser(userName).subscribe({
            complete: () => {
                for (var i = 0; i < this.users.length; i++) {
                    if (this.users[i].userName === userName) {
                        this.users.splice(i, 1);
                        this.totalCount--;
                        break;
                    }
                }
            },
            error: (err) => {
                this.errorMessage = JSON.stringify(err);
                this.errorService.handleHttpError(err);
            }
        });
    }
}