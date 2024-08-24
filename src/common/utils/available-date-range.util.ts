export interface AvailableDateRange {
  startDate: Date;
  endDate: Date | null;
}

export namespace AvailableDateRange {
  /** 현재 날짜가 활성화 범위에 포함되는지 확인 */
  export function isActive({
    startDate,
    endDate,
    now = new Date(),
  }: AvailableDateRange & {now?: Date}): boolean {
    if(now < startDate) return false;
    if(endDate && now > endDate) return false;

    return true;
  }
}