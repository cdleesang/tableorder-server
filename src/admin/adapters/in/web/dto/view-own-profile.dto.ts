export interface ViewOwnProfileResponseDto {
  /** 관리자 id */
  id: string;

  /** 로그인 아이디 */
  signInId: string;

  /** 이름 */
  name: string;

  /** 가입일 */
  joinedAt: Date;
}