interface CallOption {
  /** 직원호출옵션 고유 아이디 */
  id: number;
  /** 직원호출 표시명 */
  title: string;
  /** 수량 선택 가능 여부 */
  isCountable: boolean;
}

export type GetCallStaffOptionsResponse = CallOption[];