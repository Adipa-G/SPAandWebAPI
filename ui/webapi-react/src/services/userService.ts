import { HttpService } from "./httpService";

export class UserService {
    httpService: HttpService;

    constructor() {
        this.httpService = new HttpService();
    }

    getUsers = (sortAndPage: any, callback: Function): void => {
        this.httpService.post('api/Account/list',
            sortAndPage,
            (data: any) => {
                callback({ success: true, totalCount: data.totalCount, users: data.results });
            },
            (error: any) => {
                callback({ success: false, error: error });
            });
    }

    deleteUser = (userName: string, callback: Function): void => {
        this.httpService.delete(`api/Account/${userName}`,
            null,
            () => {
                callback({ success: true });
            },
            (error: any) => {
                callback({ success: false, error: error });
            });
    }
}