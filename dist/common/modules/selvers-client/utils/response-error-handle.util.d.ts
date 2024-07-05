import { AxiosError, AxiosResponse } from 'axios';
import { Observable } from 'rxjs';
declare class ResponseError extends Error {
    constructor(apiName: string);
}
export declare function responseErrorHandle<T>(apiName: string, request: Observable<AxiosResponse<T, any>>, additionalLogs?: {
    [key: string]: any;
}, customHandlers?: {
    axiosHandler?: (err: AxiosError) => void;
    responseHandler?: (res: T, responseErrorLogger: () => void, responseError: ResponseError) => void | Promise<void>;
}): Promise<T>;
export {};
