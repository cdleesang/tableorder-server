import { AxiosError, AxiosResponse } from 'axios';
import { Observable, catchError, firstValueFrom } from 'rxjs';

class ResponseError extends Error {
  constructor(apiName: string) {
    super(`${apiName}에 실패했습니다.`);
  }
}

export async function responseErrorHandle<T>(
  apiName: string,
  request: Observable<AxiosResponse<T, any>>,
  additionalLogs: {[key: string]: any} = {},
  customHandlers?: {
    axiosHandler?: (err: AxiosError) => void,
    responseHandler?: (data: T, responseErrorLogger: () => void, responseError: ResponseError) => void | Promise<void>
  }
): Promise<T> {
  
  const { data } = await firstValueFrom(
    request.pipe(catchError((err: AxiosError) => {
      const axiosErrorLogger = () => console.error(
        `[${apiName}] Axios Error\n`,
        Object.keys(additionalLogs).map(key => `${key}: ${additionalLogs[key]}\n`),
        err,
      );

      if(customHandlers && customHandlers.axiosHandler) {
        customHandlers.axiosHandler(err);
      }
        
      axiosErrorLogger();
      throw new ResponseError(apiName);
    })),
  );

  const responseErrorLogger = () => console.error(
    `[${apiName}] Response Error\n`,
    ...Object.keys(additionalLogs).map(key => `Parameter: ${key}: ${additionalLogs[key]}\n`),
    `Response: ${JSON.stringify(data)}`,
  );

  if(customHandlers && customHandlers.responseHandler) {
    await customHandlers.responseHandler(data, responseErrorLogger, new ResponseError(apiName));
  } else {
    // 기본 에러 핸들러
    if((data as T & {result: 'ok' | string}).result !== 'ok') {
      responseErrorLogger();
      throw new ResponseError(apiName);
    }
  }

  return data;
}