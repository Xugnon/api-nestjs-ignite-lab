import { CancelNotificationUseCase } from '@app/useCases/cancelNotifcationUseCase';
import { CountRecipientNotificationsUseCase } from '@app/useCases/countRecipientNotificationsUseCase';
import { GetRecipientNotificationsUseCase } from '@app/useCases/getRecipientNotificationsUseCase';
import { ReadNotificationUseCase } from '@app/useCases/readNotificationUseCase';
import { UnreadNotificationUseCase } from '@app/useCases/unreadNotificationUseCase';
import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { SendNotificationUseCase } from 'src/app/useCases/sendNotificationUseCase';
import { CreateNotificationBody } from '../dtos/create-notification-body';
import { NotificationViewModel } from '../view-models/notificationViewModel';

@Controller('notifications')
export class NotificationsController {
  constructor(
    private sendNotification: SendNotificationUseCase,
    private cancelNotification: CancelNotificationUseCase,
    private readNotification: ReadNotificationUseCase,
    private unreadNotification: UnreadNotificationUseCase,
    private countRecipientNotifications: CountRecipientNotificationsUseCase,
    private getRecipientNotifications: GetRecipientNotificationsUseCase,
  ) {}

  @Patch(':id/cancel')
  async cancel(@Param('id') id: string) {
    await this.cancelNotification.execute({ notificationId: id });
  }

  @Get('count/from/:recipientId')
  async countFromRecipient(@Param('recipientId') recipientId: string) {
    const { count } = await this.countRecipientNotifications.execute({
      recipientId,
    });

    return {
      count,
    };
  }

  @Get('from/:recipientId')
  async getFromRecipient(@Param('recipientId') recipientId: string) {
    const { notifications } = await this.getRecipientNotifications.execute({
      recipientId,
    });

    return {
      notifications: notifications.map(NotificationViewModel.toHTTP),
    };
  }

  @Patch(':id/read')
  async read(@Param('id') id: string) {
    await this.readNotification.execute({ notificationId: id });
  }

  @Patch(':id/unread')
  async unread(@Param('id') id: string) {
    await this.unreadNotification.execute({ notificationId: id });
  }

  @Post()
  async create(@Body() body: CreateNotificationBody) {
    const { recipientId, content, category } = body;

    const { notification } = await this.sendNotification.execute({
      recipientId,
      content,
      category,
    });

    return { notification: NotificationViewModel.toHTTP(notification) };
  }
}
