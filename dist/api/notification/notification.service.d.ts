import { MessageEvent } from '@nestjs/common';
export declare class NotificationService {
    private notificationEvent;
    handleConnection(): import("rxjs").Observable<MessageEvent>;
    sendNotification(messageEvent: MessageEvent): void;
}
