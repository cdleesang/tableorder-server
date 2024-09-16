import typia from 'typia';

export namespace GetAllSlideImagesDto {
  export interface Response {
    /** 슬라이드 이미지 URL */
    imageUrls: (string & typia.tags.Format<'url'>)[];
  }
}