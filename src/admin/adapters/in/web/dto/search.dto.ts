import type typia from 'typia';

export interface SearchRequestDto {
  page: number & typia.tags.Minimum<1>;
  size: number & typia.tags.Minimum<1> & typia.tags.Maximum<30>;
}

export type SearchResponseDto = Array<{
  id: string;
  name: string;
  joinedAt: Date;
}>;