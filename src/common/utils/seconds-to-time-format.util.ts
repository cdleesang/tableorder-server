/**
 * 초를 문자열 시간 포맷으로 변환
 * ex) 3661 => "01:01:01"
 */
export function secondsToTimeFormat(seconds: number) {
  const hour = Math.floor(seconds / 3600) % 24;
  const minute = Math.floor(seconds / 60) % 60;
  const second = seconds % 60;

  return `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}:${second.toString().padStart(2, '0')}`;
}