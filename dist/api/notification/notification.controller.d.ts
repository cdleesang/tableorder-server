import { MessageEvent } from '@nestjs/common';
import { Observable } from 'rxjs';
import { NotificationService } from './notification.service';
export declare class NotificationController {
    private readonly notificationService;
    constructor(notificationService: NotificationService);
    sse(): Observable<MessageEvent>;
}
