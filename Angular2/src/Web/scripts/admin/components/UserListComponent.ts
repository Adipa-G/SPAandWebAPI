import {Component} from 'angular2/core';
import {SortAndPage} from '../../domain/common/SortAndPage';
import {UserInfo} from '../../domain/admin/UserInfo';

import {ErrorService} from '../../common/services/ErrorService';
import {UserService} from "../services/UserService";

@Component({
    selector: 'admin-users',
    viewProviders: [UserService],
    templateUrl: './templates/admin/components/UserListComponent.html'
})

export class UserListComponent {
    private sortAndPage: SortAndPage;
    private errorMessage: string;
    private users : UserInfo[];

    constructor(private errorService: ErrorService, private userService: UserService) {
        this.errorService = errorService;
        this.userService = userService;
        this.users = [];

        this.sortAndPage = this.initSortDetails();

        this.userService.getUsers(this.sortAndPage).subscribe(
            data => {
                this.users = data.results;
            },
            err => {
                this.errorMessage = JSON.stringify(err);
                this.errorService.handleHttpError(err);
            });
    }

    private initSortDetails(): SortAndPage {
        var sortAndPage: SortAndPage = new SortAndPage();
        sortAndPage.orderField = 'UserName';
        sortAndPage.orderDirection = 'Asc';
        sortAndPage.pageNumber = 1;
        sortAndPage.pageSize = 10;
        return sortAndPage;
    }

    public deleteUser(userName: string): void {
        this.userService.deleteUser(userName).subscribe(
            data => {
                for (var i = 0; i < this.users.length; i++) {
                    if (this.users[i].userName === userName) {
                        this.users.splice(i, 1);
                        break;
                    }
                }
            },
            err => {
                this.errorMessage = JSON.stringify(err);
                this.errorService.handleHttpError(err);
            });
    }
}