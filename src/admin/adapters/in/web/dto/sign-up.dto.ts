import type typia from 'typia';

export interface SignUpRequestDto {
  /** 로그인 아이디 */
  signInId: string & typia.tags.MinLength<1> & typia.tags.MaxLength<50>;

  /** 비밀번호 */
  password: string & typia.tags.MinLength<1> & typia.tags.MaxLength<50>;

  /** 이름 */
  name: string & typia.tags.MaxLength<20>;
}