import { Column } from 'src/common/modules/pos-repository/decorators/column.decorator';

export class TableNMEntity {
  /** 테이블번호 */
  @Column('ISEQ')
  seq!: number;

  /** 담당 포스번호 */
  @Column('POSNO')
  posNo!: number;

  /** 테이블명 */
  @Column('TNAME')
  name!: string;

  /** 포스기상 X좌표 */
  @Column('POSX')
  posX!: number;

  /** 포스기상 Y좌표 */
  @Column('POSY')
  posY!: number;

  /** 포스기상 백그라운드 컬러 */
  @Column('BCOLOR')
  backgroundColor!: string | null;

  /** 포스기 상 가로길이 */
  @Column('WIDTH')
  width!: number | null;

  /** 포스기 상 세로길이 */
  @Column('HEIGHT')
  height!: number | null;
}