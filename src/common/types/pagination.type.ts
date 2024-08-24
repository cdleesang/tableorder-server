export interface Pagination {
  /** 페이지 번호 */
  page: number;

  /** 페이지 당 항목 수 */
  size: number;
}

export interface Paginated<T> {
  /** 전체 항목 수 */
  totalCount: number;

  /** 페이지 당 항목 수 */
  size: number;

  /** 페이지 번호 */
  page: number;

  /** 다음 페이지 존재 여부 */
  hasMore: boolean;

  /** 항목 목록 */
  items: T[];
}

export function formatToPaginated<T, U>(mapperFn: (item: U) => T): (items: U[], pagination: Pagination, totalCount: number) => Paginated<T>;
export function formatToPaginated<T>(items: T[], pagination: Pagination, totalCount: number): Paginated<T>;

export function formatToPaginated(mapperFnOrItems: any, pagination?: Pagination, totalCount?: number) {
  const createPaginated = (items: any[], pagination2: Pagination, totalCount2: number) => {
    return {
      totalCount,
      page: pagination2.page,
      size: pagination2.size,
      hasMore: totalCount2 > pagination2.page * pagination2.size,
      items,
    };
  };

  if(typeof mapperFnOrItems === 'function') return createPaginated;

  return createPaginated(mapperFnOrItems, pagination!, totalCount!);
}