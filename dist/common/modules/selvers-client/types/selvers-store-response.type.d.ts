import type { NumericString } from 'src/common/types/numeric-string.type';
export interface TOrderMainImagesResponse {
    result: 'ok' | string;
    message: 'ok' | string;
    data: {
        id: NumericString;
        s3_url: string;
        ranking: NumericString;
    }[];
}
