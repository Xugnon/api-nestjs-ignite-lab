import { Content } from '@app/entities/content';
import { Notification } from '@app/entities/notification';
import { makeNotification } from '@test/factories/notificationFactory';
import { InMemoryNotificationsRepository } from '@test/repositories/inMemoryNotificationsRepository';
import { CancelNotificationUseCase } from './cancelNotifcationUseCase';
import { NotificationNotFound } from './errors/notificationNotFound';

describe('Cancel Notification', () => {
  it('should be able to cancel a notification', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const cancelNotification = new CancelNotificationUseCase(
      notificationsRepository,
    );

    const notification = makeNotification();

    await notificationsRepository.create(notification);

    await cancelNotification.execute({
      notificationId: notification.id,
    });

    expect(notificationsRepository.notifications[0].canceledAt).toEqual(
      expect.any(Date),
    );
  });

  it('should no be able to cancel a non existing notification', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const cancelNotification = new CancelNotificationUseCase(
      notificationsRepository,
    );

    expect(() => {
      return cancelNotification.execute({
        notificationId: 'fake-notification',
      });
    }).rejects.toThrow(NotificationNotFound);
  });
});
