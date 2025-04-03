export interface BaseResponse<T> {
    error: boolean;
    status: number;
    message: string;
    data: T;
}