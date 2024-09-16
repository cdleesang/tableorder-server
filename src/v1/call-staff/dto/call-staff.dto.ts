import typia from 'typia';

export namespace CallStaffDto {
  export interface Request {
    options: {
      /** 옵션 아이디 */
      id: number & typia.tags.Type<'int32'>;
  
      /** 옵션명 */
      title: string & typia.tags.MaxLength<100>;
  
      /** 옵션 수량 */
      quantity: number & typia.tags.Type<'int32'> & typia.tags.Minimum<1>,
    }[];
  }
}