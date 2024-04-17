import { Injectable, MessageEvent } from '@nestjs/common';
import { Subject } from 'rxjs';

@Injectable()
export class NotificationService {
  private notificationEvent: Subject<MessageEvent> = new Subject();

  handleConnection() {
    return this.notificationEvent.asObservable();
  }

  sendNotification(messageEvent: MessageEvent) {
    this.notificationEvent.next(messageEvent);
  }
}