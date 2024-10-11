import * as jQuery from "jquery";
import * as React from "react";

import { UserService } from "../services/userService"

import SortHeader from "./shared/sortHeader";
import TablePager from "./shared/tablePager";
import ErrorMessage from "./shared/errorMessage";

declare var window: any;

export interface UserListProps { }

export interface UserListState {
    sortAndPage: any,
    totalCount: number,
    users: Array<any>,
    errorMessage: string;
}

export class Users extends React.Component<UserListProps, UserListState> {
    userService: UserService;

    constructor(props: any) {
        super(props);
        this.userService = new UserService();

        this.state = {
            sortAndPage: { OrderField: 'UserName', OrderDirection: 'Asc', PageNumber: 1, PageSize: 10 },
            users: [],
            totalCount: 0,
            errorMessage: ''
        };
    }

    componentDidMount = () => {
        this.loadUsers();
    }

    loadUsers = () => {
        this.userService.getUsers(this.state.sortAndPage, (result: any) => {
            if (result.success) {
                this.setState((prevState: UserListState) => {
                    let newState: UserListState = jQuery.extend(true, {}, prevState) as UserListState;
                    newState.users = result.users;
                    newState.totalCount = result.totalCount;
                    newState.errorMessage = '';
                    return newState;
                });
            } else {
                this.setState((prevState: UserListState) => {
                    let newState: UserListState = jQuery.extend(true, {}, prevState) as UserListState;
                    newState.users = [];
                    newState.totalCount = 0;
                    newState.errorMessage = result.error;
                    return newState;
                });
            }
        });
    }

    deleteUser = (user: any) => {
        if (!window.confirm("Are you sure you want to delete this user?")) {
            return;
        }

        this.userService.deleteUser(user.userName, (result: any) => {
            if (result.success) {
                this.setState((prevState: UserListState) => {
                    let newState: UserListState = jQuery.extend(true, {}, prevState) as UserListState;
                    newState.errorMessage = '';

                    var index = prevState.users.indexOf(user);
                    if (index !== -1) {
                        newState.users.splice(index, 1);
                        newState.totalCount -= 1;
                    }

                    return newState;
                });
            } else {
                this.setState((prevState: UserListState) => {
                    let newState: UserListState = jQuery.extend(true, {}, prevState) as UserListState;
                    newState.errorMessage = result.error;
                    return newState;
                });
            }
        });
    }

    orderOrPageChanged = () => {
        this.loadUsers();
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-8 col-md-offset-2">
                    <table className="table table-striped table-bordered table-hover table-responsive">
                        <thead>
                            <tr>
                                <SortHeader
                                    headerText="UserName"
                                    orderData={this.state.sortAndPage}
                                    orderField="UserName"
                                    orderChanged={() => this.orderOrPageChanged()} />
                                <th className="icon-col-1">&nbsp;</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.users.map((user, i) => {
                                return (
                                    <tr key={i}>
                                        <td> {user.userName} </td>
                                        <td className="text-right">
                                            <button type="button" className="btn btn-danger btn-xs" onClick={() => this.deleteUser(user)}>
                                                <i className="fa fa-trash-o"></i>
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                    <TablePager
                        totalCount={this.state.totalCount}
                        pageData={this.state.sortAndPage}
                        pageChanged={() => this.orderOrPageChanged()} />
                    <ErrorMessage errorMessage={this.state.errorMessage} />
                </div>
            </div>
        );
    }
}