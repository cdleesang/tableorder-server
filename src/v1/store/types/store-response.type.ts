import typia from 'typia';

export interface GetAllSlideImagesResponse {
  imageUrls: (string & typia.tags.Format<'url'>)[];
}