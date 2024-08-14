import { Column } from 'src/common/modules/pos-repository/decorators/column.decorator';
import { Transform } from 'src/common/modules/pos-repository/decorators/transform.decorator';
import { transformOrderTime } from './utils/transform-order-time';

export class HTableEntity {
  /** 주문번호 */
  @Column('ISEQ')
  seq!: number;

  /** 테이블번호 */
  @Column('TABLENO')
  tableNo!: number;

  /** 포스번호 */
  @Column('POSNO')
  posNo!: number;

  /** 상품코드 */
  @Column('STOCKCODE')
  stockCode!: string;

  /** 상품명 */
  @Column('STOCKNAME')
  stockName!: string;

  /** 단가 */
  @Column('DANGA')
  amount!: number;

  /** 수량 */
  @Column('QTY')
  quantity!: number;

  /** 총액 */
  @Column('AMOUNT')
  totalAmount!: number;

  @Column('CHECKIN')
  CHECKIN!: string;

  /** 빌지 출력 프린트 고유번호 */
  @Column('KITPRN')
  KITPRN!: string;

  @Column('CANGB')
  CANGB!: string | null;

  @Column('SVCGB')
  SVCGB!: string;

  @Column('DCGB')
  DCGB!: string;

  @Column('DCAMT')
  DCAMT!: number;

  @Column('CHASU')
  CHASU!: number;

  @Column('SMAN')
  SMAN!: string;

  /** 주문시간 YYYYMMDDHHMMSS */
  @Column('OTIME')
  @Transform<string>(transformOrderTime)
  orderTime!: Date;

  ORDNO!: number;
  VATGB!: string;
  VAT!: number | null;
  UNIT!: number;
  DLCARDNO!: string | null;
}