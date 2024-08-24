import { AvailableDateRange } from 'src/common/utils/available-date-range.util';
import { AvailableTimeRange } from 'src/common/utils/available-time-range.util';
import { Menu } from './menu.model';
import { MenuOption } from './menu-option.model';

/**
 * 세트 메뉴
 */
export interface SetMenu {
  readonly id: string;
  
  /** 썸네일 이미지 URL */
  thumbnailImageUrl: string | null;

  /** 세트메뉴명 */
  name: string;

  /** 세트메뉴 설명 */
  description: string | null;

  /** 태그 목록 */
  tags: string[];

  discount: {
    /**
     * 할인 타입
     * percent: 퍼센트 할인 (value가 10이면 10% 할인)
     * amount: 금액 할인 (value가 1000이면 1000원 할인)
     * fixed: 고정 금액 (value가 10000이면 10000원)
     */
    type: 'percent' | 'amount' | 'fixed';
    value: number;
  } | null;

  /**
   * 라디오 버튼으로 선택 가능한 메뉴 그룹 목록
   */
  menuGroups: {
    id: number;

    /** 메뉴 그룹명 */
    name: string | null;
    
    /**
     * 메뉴 그룹의 기본 가격
     * 메뉴들 중 가격이 가장 낮은 메뉴의 가격이며 해당 가격보다 높은 메뉴들은 추가 금액이 발생
     * ex) basePrice가 10000이고 메뉴 A의 가격이 12000일 때 메뉴 A 선택 시 추가 금액 2000원
     */
    basePrice: number;

    menus: Omit<Menu, 'optionGroups' | 'category'>[];
  }[];

  /** 활성화 가능한 시간 범위 */
  availableTimeRange: AvailableTimeRange | null;

  /** 활성화 가능한 날짜 범위 */
  availableDateRange: AvailableDateRange | null;

  /** 옵션 그룹 목록 */
  optionGroups: {
    id: number;

    /** 옵션 그룹명 */
    name: string;

    /** 필수 선택 여부 */
    isRequired: boolean;

    /** 다중 선택 가능 여부 */
    multiSelect: {
      /** 최소 선택 가능 수 */
      min: number | null;
      /** 최대 선택 가능 수 */
      max: number | null;
    } | null;

    /** 옵션 목록 */
    options: MenuOption[];
  }[];

  /** 노출 여부 */
  isDisplay: boolean;

  createdAt: Date;
  updatedAt: Date;
}

export namespace SetMenu {
  export function isActive({isDisplay, availableTimeRange, availableDateRange, menuGroups}: Pick<SetMenu, 'isDisplay' | 'availableTimeRange' | 'availableDateRange' | 'menuGroups'>): boolean {
    if(!isDisplay) return false;
    if(availableTimeRange && !AvailableTimeRange.isActive(availableTimeRange)) return false;
    if(availableDateRange && !AvailableDateRange.isActive(availableDateRange)) return false;
    // 모든 메뉴가 비활성화 상태인 메뉴 그룹이 하나라도 있으면 비활성화 처리
    if(menuGroups.some(({menus}) => menus.every(menu => !Menu.isActive(menu)))) return false;

    return true;
  }

  export function isSoldOut({menuGroups}: Pick<SetMenu, 'menuGroups'>): boolean {
    // 모든 메뉴가 품절 상태인 메뉴 그룹이 하나라도 있으면 품절 처리
    return menuGroups.some(({menus}) => menus.every(menu => Menu.isSoldOut(menu)));
  }

  /**
   * 사용자에게 표시할 가격을 반환
   * 고정 금액 할인이 설정되어 있으면 할인 금액을 반환하고
   * 그렇지 않으면 메뉴 그룹의 최소 가격의 합에 할인가를 적용한 금액을 반환
   */
  export function calculateMinimumPrice({discount, menuGroups}: Pick<SetMenu, 'discount' | 'menuGroups'>): number {
    if(discount && discount.type === 'fixed') {
      return discount.value;
    }

    const minimumPrice = menuGroups.reduce((acc, {menus}) => (
      acc + menus.reduce((min, {price}) => Math.min(min, price), Number.MAX_SAFE_INTEGER)
    ), 0);

    if(!discount) {
      return minimumPrice;
    }

    switch(discount.type) {
      case 'percent':
        return minimumPrice - (minimumPrice * (discount.value / 100));
      case 'amount':
        return minimumPrice - discount.value;
      default:
        return minimumPrice;
    }
  }
}