import type { NumericString } from 'src/common/types/numeric-string.type';

export interface TOrderMainImagesResponse {
  result: 'ok' | string;
  message: 'ok' | string;
  data: {
    id: NumericString;
    /** full path */
    s3_url: string;

    /** 정렬 순서 */
    ranking: NumericString;
  }[];
}