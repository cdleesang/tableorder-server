import typia from 'typia';
import { secondsToTimeFormat } from './seconds-to-time-format.util';

export interface AvailableTimeRange {
  /* 활성화 시작 시간 */
  startTimeInSeconds: number;

  /* 활성화 기간 */
  durationInSeconds: number;
}

export namespace AvailableTimeRange {
  /** 현재 시간이 활성화 범위 내에 있는지 확인 */
  export function isActive({
    startTimeInSeconds,
    durationInSeconds,
    currentSeconds = Math.floor((Date.now() % 86400000) / 1000),
  }: AvailableTimeRange & {currentSeconds?: number}) {
    const endTimeInSeconds = startTimeInSeconds + durationInSeconds;
    
    return (startTimeInSeconds <= currentSeconds && currentSeconds < endTimeInSeconds)
    // 24시간을 넘어가는 경우 +24시간
      || (startTimeInSeconds <= currentSeconds + 24 * 3600 && currentSeconds + 24 * 3600 < endTimeInSeconds);
  }

  type RawTime = string & typia.tags.Pattern<'^(?:[01]\\d|2[0-3]):[0-5]\\d:[0-5]\\d$'>;

  export interface Raw {
    /* 활성화 시작 시간(HH:mm:ss UTC) */
    startTime: RawTime;
    /* 활성화 종료 시간(HH:mm:ss UTC) */
    endTime: RawTime;
  }

  /** AvailableTimeRange 객체를 문자열로 변환 */
  export function stringify({startTimeInSeconds, durationInSeconds}: AvailableTimeRange): Raw {
    const startTime = secondsToTimeFormat(startTimeInSeconds);
    const endTime = secondsToTimeFormat(startTimeInSeconds + durationInSeconds);

    return {startTime, endTime};
  }

  /**
   * 문자열로 된 시간을 파싱하여 AvailableTimeRange 객체로 변환
   * @throws {Error} 시간 형식이 잘못된 경우
   */
  export function parse({startTime, endTime}: Raw): AvailableTimeRange {
    if(!typia.is<RawTime>(startTime)) throw new Error('startTime must be in the format of HH:mm:ss', {cause: 'startTime'});
    if(!typia.is<RawTime>(endTime)) throw new Error('endTime must be in the format of HH:mm:ss', {cause: 'endTime'});

    const [startHour, startMinute, startSecond] = startTime.split(':').map(time => parseInt(time, 10));
    const [endHour, endMinute, endSecond] = endTime.split(':').map(time => parseInt(time, 10));
    const startTimeInSecond = startHour * 3600 + startMinute * 60 + startSecond;
    const endTimeInSecond = endHour * 3600 + endMinute * 60 + endSecond;

    return {
      startTimeInSeconds: startTimeInSecond,
      durationInSeconds: (endHour - startHour) * 3600 + (endMinute - startMinute) * 60 + (endSecond - startSecond) + (endTimeInSecond < startTimeInSecond ? 24 * 3600 : 0),
    };
  }
}