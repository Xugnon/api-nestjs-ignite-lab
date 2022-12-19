import { CancelNotificationUseCase } from '@app/useCases/cancelNotifcationUseCase';
import { CountRecipientNotificationsUseCase } from '@app/useCases/countRecipientNotificationsUseCase';
import { GetRecipientNotificationsUseCase } from '@app/useCases/getRecipientNotificationsUseCase';
import { ReadNotificationUseCase } from '@app/useCases/readNotificationUseCase';
import { UnreadNotificationUseCase } from '@app/useCases/unreadNotificationUseCase';
import { Module } from '@nestjs/common';
import { SendNotificationUseCase } from 'src/app/useCases/sendNotificationUseCase';
import { DatabaseModule } from '../database/database.module';
import { NotificationsController } from './controllers/notifications.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [NotificationsController],
  providers: [
    SendNotificationUseCase,
    CancelNotificationUseCase,
    CountRecipientNotificationsUseCase,
    GetRecipientNotificationsUseCase,
    ReadNotificationUseCase,
    UnreadNotificationUseCase,
  ],
})
export class HttpModule {}
