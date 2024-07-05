export interface UpdateOwnPasswordRequestDto {
  /** 현재 비밀번호 */
  currentPassword: string;

  /** 새 비밀번호 */
  newPassword: string;
}