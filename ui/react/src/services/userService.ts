import { CallbackFunction, OrderData, PageData } from "./serviceModels";

import { HttpService } from "./httpService";

export interface UserFilter extends OrderData, PageData {
    orderField: string,
    orderDirection: string,
    pageNumber: number,
    pageSize: number,
}

export interface UserModel {
    userName: string
}

interface UserModelResult {
    results: UserModel[],
    totalCount: number
}

export class UserService {
    httpService: HttpService;

    constructor() {
        this.httpService = new HttpService();
    }

    getUsers = (filter: UserFilter, callback: CallbackFunction<UserModel[]>): void => {
        this.httpService.post('api/Account/list',
            filter,
            (data: UserModelResult) => {
                callback({
                    success: true,
                    totalCount: data.totalCount,
                    data: data.results,
                    error: ''
                });
            },
            (error: string) => {
                callback({
                    success: false,
                    data: [],
                    totalCount: 0,
                    error: error
                });
            });
    }

    deleteUser = (userName: string, callback: CallbackFunction<string>): void => {
        this.httpService.delete(`api/Account/${userName}`,
            null,
            () => {
                callback({
                    success: true,
                    error: '',
                    data: '',
                    totalCount: 1
                });
            },
            (error: any) => {
                callback({
                    success: false,
                    error: error,
                    data: '',
                    totalCount: 0
                });
            });
    }
}