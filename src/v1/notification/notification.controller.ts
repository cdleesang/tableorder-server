import { Controller, MessageEvent, Sse, VERSION_NEUTRAL } from '@nestjs/common';
import { Observable } from 'rxjs';
import { NotificationService } from './notification.service';

@Controller({path: 'notification', version: VERSION_NEUTRAL})
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  /**
   * 알림 SSE.
   * 
   * @tag 알림
   */
  @Sse('sse')
  sse(): Observable<MessageEvent> {
    return this.notificationService.handleConnection();
  }
}