import typia from 'typia';
import { NumericString } from 'src/common/types/numeric-string.type';

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

/**
 * Cart
 */
/** 장바구니 고유 아이디 */
export type CartId = NumericString;

/**
 * Order
 */
/** 주문서 고유 아이디 */
export type OrderSheetId = NumericString;

export type SelversDateTime = string & typia.tags.Pattern<'^\\d{4}-\\d{2}-\\d{2} \\d{2}:\\d{2}:\\d{2}$'>;