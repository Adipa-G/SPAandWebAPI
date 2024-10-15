export interface CallbackResult<T = any> {
    success: boolean,
    data: T,
    totalCount: number,
    error: string
}

export type CallbackFunction<T = any> = (results: CallbackResult<T>) => void;
