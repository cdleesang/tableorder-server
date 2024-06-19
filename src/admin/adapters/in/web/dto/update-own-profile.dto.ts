import type typia from 'typia';

export interface UpdateOwnProfileRequestDto {
  /** 이름 */
  name: string & typia.tags.MaxLength<20>;
}