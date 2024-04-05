import { NumericString } from '../../../common/types/numeric-string.type';

/**
 * Store
 */
/** 가게 고유 아이디 */
export type StoreId = NumericString;
/** 상호명 */
export type StoreName = string;

/**
 * Easycall
 */
/** 직원호출옵션 고유 아이디 */
export type EasycallOptionId = NumericString;

/**
 * Table
 */
/** 테이블 고유 아이디 */
export type TableId = NumericString;

/**
 * Food
 */
/** 메뉴 고유 아이디 */
export type FoodId = NumericString;
/** 세트메뉴 옵션 그룹 고유 아이디 */
export type FoodOptionGroupId = NumericString;
/** 세트메뉴 옵션 고유 아이디 */
export type FoodOptionId = NumericString;