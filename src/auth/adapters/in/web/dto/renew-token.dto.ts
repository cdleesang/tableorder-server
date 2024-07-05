export interface RenewTokenRequestDto {
  /** 리프레시 토큰 */
  refreshToken: string;
}

export interface RenewTokenResponseDto {
  /** 엑세스 토큰 */
  accessToken: string;

  /** 리프레시 토큰 */
  refreshToken: string;
}