import { AvailableDateRange } from 'src/common/utils/available-date-range.util';
import { AvailableTimeRange } from 'src/common/utils/available-time-range.util';

interface MenuCategory {
  readonly id: string;

  /** 카테고리명 */
  name: string;
  
  /** 활성화 가능한 시간 범위 */
  availableTimeRange: AvailableTimeRange | null;

  /** 활성화 가능한 날짜 범위 */
  availableDateRange: AvailableDateRange | null;

  /** 정렬 순서 */
  order: number;
}

export namespace MenuCategory {
  export interface Main extends MenuCategory {}

  export interface Sub extends MenuCategory {}

  export type Tree = Main & { subCategories: Sub[] };

  export function isActive({availableTimeRange, availableDateRange}: Pick<MenuCategory, 'availableTimeRange' | 'availableDateRange'>): boolean {
    if(availableTimeRange && !AvailableTimeRange.isActive(availableTimeRange)) return false;
    if(availableDateRange && !AvailableDateRange.isActive(availableDateRange)) return false;

    return true;
  }
}