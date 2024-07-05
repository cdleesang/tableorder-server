/**
 * 주문시간을 Date 객체로 변환
 * @param orderTime 주문시간 YYYYMMDDHHMMSS
 */
export function transformOrderTime(orderTime: string) {
  const regex = /(^\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/;

  if(!regex.test(orderTime)) {
    throw new Error('Invalid orderTime format');
  }

  const isoDateTimeStr = orderTime.replace(regex, '$1-$2-$3T$4:$5:$6+09:00');

  return new Date(isoDateTimeStr);
}