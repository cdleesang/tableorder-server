import { Controller, MessageEvent, Sse } from '@nestjs/common';
import { Observable } from 'rxjs';
import { NotificationService } from './notification.service';

@Controller('notification')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  /**
   * 알림 SSE.
   * 
   * @tags 알림
   */
  @Sse('sse')
  sse(): Observable<MessageEvent> {
    return this.notificationService.handleConnection();
  }
}