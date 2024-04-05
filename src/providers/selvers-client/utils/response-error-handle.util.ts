import { AxiosError, AxiosResponse } from 'axios';
import { Observable, catchError, firstValueFrom } from 'rxjs';

class ResponseError extends Error {
  constructor(apiName: string) {
    super(`${apiName}에 실패했습니다.`);
  }
}

export async function responseErrorHandle<T extends {result: string}>(
  apiName: string,
  request: Observable<AxiosResponse<T, any>>,
  additionalLogs: {[key: string]: any} = {},
) {
  const { data } = await firstValueFrom(
    request.pipe(catchError((err: AxiosError) => {
      console.error(
        `[${apiName}] Axios Error\n`,
        Object.keys(additionalLogs).map(key => `${key}: ${additionalLogs[key]}\n`),
        err,
      );
      throw new ResponseError(apiName);
    })),
  );

  if(data.result !== 'ok') {
    console.error(
      `[${apiName}] Response Error\n`,
      ...Object.keys(additionalLogs).map(key => `${key}: ${additionalLogs[key]}\n`),
      data,
    );
    throw new ResponseError(apiName);
  }

  return data;
}