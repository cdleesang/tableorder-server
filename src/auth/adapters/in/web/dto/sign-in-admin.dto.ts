export interface SignInAdminRequestDto {
  /** 로그인 아이디 */
  signInId: string;

  /** 비밀번호 */
  password: string;
}

export interface SignInAdminResponseDto {
  /** 액세스 토큰 */
  accessToken: string;

  /** 리프레시 토큰 */
  refreshToken: string;
}