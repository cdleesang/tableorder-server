import type typia from 'typia';
export interface SignUpRequestDto {
    signInId: string & typia.tags.MinLength<1> & typia.tags.MaxLength<50>;
    password: string & typia.tags.MinLength<1> & typia.tags.MaxLength<50>;
    name: string & typia.tags.MaxLength<20>;
}
