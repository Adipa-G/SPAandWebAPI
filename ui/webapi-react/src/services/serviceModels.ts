export interface OrderData {
    orderField: string,
    orderDirection: string,
}

export interface PageData {
    pageNumber: number,
    pageSize: number
}

export interface CallbackResult<T = any> {
    success: boolean,
    data: T,
    totalCount: number,
    error: string
}

export type CallbackFunction<T = any> = (results: CallbackResult<T>) => void;
