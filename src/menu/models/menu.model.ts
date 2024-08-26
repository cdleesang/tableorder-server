import { AvailableDateRange } from 'src/common/utils/available-date-range.util';
import { AvailableTimeRange } from 'src/common/utils/available-time-range.util';
import { MenuCategory } from './menu-category.model';
import { MenuOption } from './menu-option.model';

/** 
 * 메뉴
 * 사케만을 제외한 모든 메뉴
 * 음료, 기타 주류도 포함
 */
export interface Menu {
  readonly id: string;

  /** 썸네일 이미지 URL */
  thumbnailImageUrl: string | null;

  /** 메뉴명 */
  name: string;

  /** 메뉴 설명 */
  description: string | null;

  /** 가격 */
  price: number;

  /** 태그 목록 */
  tags: string[];

  /** 활성화 가능한 시간 범위 */
  availableTimeRange: AvailableTimeRange | null;

  /** 활성화 가능한 날짜 범위 */
  availableDateRange: AvailableDateRange | null;
  
  /** 메뉴 카테고리 */
  category: {
    main: Pick<MenuCategory.Main, 'id' | 'name'>;
    sub: Pick<MenuCategory.Sub, 'id' | 'name'> | null;
  } | null;

  /** 옵션 그룹 목록 */
  optionGroups: {
    id: string;

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
    options: Omit<MenuOption, 'createdAt' | 'updatedAt'>[];
  }[];

  /** 품절 상태 */
  soldOut: {
    releaseDate: Date | null;
  } | false;

  /** 노출 여부 */
  isDisplay: boolean;

  /** 정렬 순서 */
  order: number;

  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export namespace Menu {
  export type OptionGroup = Menu['optionGroups'][number];

  /** 옵션 그룹이 유효한지 확인 */
  export function isValidOptionGroup(optionGroup: Pick<Menu['optionGroups'][number], 'multiSelect'>): boolean {
    if(optionGroup.multiSelect) {
      const {min, max} = optionGroup.multiSelect;

      // 최대 선택 가능 수는 1 이상이어야 함
      if(max !== null && max < 1) return false;
      // 최소 선택 가능 수는 최대 선택 가능 수보다 작거나 같아야 함
      if(min !== null && max !== null && min > max) return false;
    }

    return true;
  }

  export function isActive({isDisplay, availableTimeRange, availableDateRange}: Pick<Menu, 'isDisplay' | 'availableTimeRange' | 'availableDateRange'>): boolean {
    if(!isDisplay) return false;
    if(availableTimeRange && !AvailableTimeRange.isActive(availableTimeRange)) return false;
    if(availableDateRange && !AvailableDateRange.isActive(availableDateRange)) return false;

    return true;
  }

  export function isSoldOut(menu: Pick<Menu, 'soldOut'>): boolean {
    if(!menu.soldOut) return false;
    if(menu.soldOut.releaseDate && new Date() > menu.soldOut.releaseDate) return false;

    return true;
  }
}