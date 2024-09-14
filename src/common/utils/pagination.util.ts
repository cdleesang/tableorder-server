import typia from 'typia';

export namespace Pagination {
  /** 오프셋 기반 페이징 */
  export namespace Offset {
    export interface Params {
      /** 페이지 번호 */
      page: number & typia.tags.Default<1> & typia.tags.Minimum<1>;
    
      /** 페이지 당 항목 수 */
      size: number & typia.tags.Default<10> & typia.tags.Minimum<1> & typia.tags.Maximum<20>;
    }
    
    export interface Result<T> {
      /** 전체 항목 수 */
      totalCount: number;
    
      /** 페이지 당 항목 수 */
      size: number;
    
      /** 페이지 번호 */
      page: number;
    
      /** 다음 페이지 존재 여부 */
      hasNext: boolean;
    
      /** 항목 목록 */
      items: T[];
    }
    
    export function paginate<T>({items, page, size, totalCount}: Params & {items: T[], totalCount: number}): Result<T> {
      return {
        items,
        size,
        page,
        totalCount,
        hasNext: page * size < totalCount,
      };
    }
  }

  /** 커서 기반 페이징 */
  export namespace Cursor {
    export interface Params<C> {
      /**
       * 페이지 당 항목 수
       * 
       * size가 음수인 경우 역순 페이징
       */
      size: number & typia.tags.Default<10> & typia.tags.Minimum<-20> & typia.tags.Maximum<20>;
    
      /** 이전 페이지 마지막 항목의 커서 */
      after: C | null;
    }
    
    export interface Result<T, C> {
      /** 페이지 당 항목 수 */
      size: number;
    
      /** 현재 페이지 첫번째 항목의 커서 */
      prevCursor: C | null;
    
      /** 현재 페이지 마지막 항목의 커서 */
      nextCursor: C | null;

      /** 다음 페이지 존재 여부 */
      hasNext: boolean;
    
      /** 항목 목록 */
      items: T[];
    }

    export function paginate<T, C>({items, size, getCursor}: Pick<Params<C>, 'size'> & {items: T[], getCursor: (item: T) => C}): Result<T, C> {
      return {
        size,
        prevCursor: getCursor(items[0]),
        nextCursor: getCursor(items[items.length - 1]),
        hasNext: items.length === Math.abs(size),
        items,
      };
    }
  }
}