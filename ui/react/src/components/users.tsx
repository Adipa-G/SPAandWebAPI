import { useState, useEffect, useMemo } from "react";

import { UserFilter, UserModel, UserService } from "../services/userService"

import ErrorMessage from "./shared/errorMessage";
import TablePager from "./shared/tablePager";
import SortHeader from "./shared/sortHeader";

export interface UsersProps {
    defaultPageSize: number
}

const Users = (props: UsersProps) => {
    const userService = useMemo(() => new UserService(), []);

    const [errorMessage, setErrorMessage] = useState('');
    const [users, setUsers] = useState<UserModel[]>([]);
    const [totalCount, setTotalCount] = useState(0);
    const [orderDirection, setOrderDirection] = useState('Desc');
    const [orderField, setOrderField] = useState('CalledOn');
    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize] = useState(props.defaultPageSize);

    const filter: UserFilter = useMemo(() => {
        return {
            orderField: orderField,
            orderDirection: orderDirection,
            pageNumber: pageNumber,
            pageSize: pageSize
        }
    }, [orderField, orderDirection, pageNumber, pageSize]);

    const orderChanged = () => {
        if (filter.orderField !== orderField) {
            setOrderField(filter.orderField);
        }
        if (filter.orderDirection !== orderDirection) {
            setOrderDirection(filter.orderDirection);
        }
    };

    const pageChanged = () => {
        if (filter.pageNumber !== pageNumber) {
            setPageNumber(filter.pageNumber);
        }
    };

    useEffect(() => {
        filter.orderField = orderField;
        filter.orderDirection = orderDirection;
        filter.pageNumber = pageNumber;
        filter.pageSize = pageSize;

        userService.getUsers(filter, (userResult) => {
            if (userResult.success) {
                setUsers(userResult.data);
                setTotalCount(userResult.totalCount);
            }
            else {
                setErrorMessage(userResult.error);
            }
        });
    }, [pageSize, pageNumber, orderField, orderDirection, userService, filter]);

    const deleteUser = (user: UserModel) => {
        if (!window.confirm("Are you sure you want to delete this user?")) {
            return;
        }

        userService.deleteUser(user.userName, (result: any) => {
            if (result.success) {
                setErrorMessage('');

                let index = users.indexOf(user);
                if (index !== -1) {
                    setUsers(users.splice(index, 1));
                    setTotalCount(totalCount - 1);
                }
            } else {
                setErrorMessage(result.error);
            }
        });
    };

    return (
        <div className="row">
            <div className="col-md-8 col-md-offset-2">
                <table className="table table-striped table-bordered table-hover table-responsive">
                    <thead>
                        <tr>
                            <SortHeader
                                headerText="UserName"
                                orderData={filter}
                                orderField="userName"
                                orderChanged={() => orderChanged()} />
                            <th className="icon-col-1">&nbsp;</th>
                        </tr>
                    </thead>
                    <tbody>
                        {(users || []).map((user, i) => {
                            return (
                                <tr key={i} data-testid='user-row'>
                                    <td> {user.userName} </td>
                                    <td className="text-right">
                                        <button type="button"
                                            data-testid='delete-user-btn'
                                            className="btn btn-danger btn-xs" onClick={() => deleteUser(user)}>
                                            <i className="fa fa-trash-o"></i>
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
                <TablePager
                    totalCount={totalCount}
                    pageData={filter}
                    pageChanged={() => pageChanged()} />
                <ErrorMessage errorMessage={errorMessage} />
            </div>
        </div>
    );
}

export default Users;