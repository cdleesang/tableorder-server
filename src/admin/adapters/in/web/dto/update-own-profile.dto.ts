import type typia from 'typia';

export interface UpdateOwnProfileRequestDto {
  name: string & typia.tags.MaxLength<20>;
}