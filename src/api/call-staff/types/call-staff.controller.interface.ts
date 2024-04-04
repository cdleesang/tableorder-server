import { tags } from 'typia';

export interface CallStaffBody {
  /**
   * 테이블 고유 아이디
   */
  tableId: number;

  options: {
    /** 옵션 아이디 */
    id: number & tags.Type<'int32'>;

    /** 옵션명 */
    title: string & tags.MaxLength<100>;

    /** 옵션 수량 */
    quantity: number & tags.Type<'int32'> & tags.Minimum<1>,
  }[];
}