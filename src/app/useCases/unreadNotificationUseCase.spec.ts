import { makeNotification } from '@test/factories/notificationFactory';
import { InMemoryNotificationsRepository } from '@test/repositories/inMemoryNotificationsRepository';
import { NotificationNotFound } from './errors/notificationNotFound';
import { UnreadNotificationUseCase } from './unreadNotificationUseCase';

describe('Unread Notification', () => {
  it('should be able to unread a notification', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const unreadNotification = new UnreadNotificationUseCase(
      notificationsRepository,
    );

    const notification = makeNotification({
      readAt: new Date(),
    });

    await notificationsRepository.create(notification);

    await unreadNotification.execute({
      notificationId: notification.id,
    });

    expect(notificationsRepository.notifications[0].readAt).toBeNull();
  });

  it('should no be able to unread a non existing notification', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const unreadNotification = new UnreadNotificationUseCase(
      notificationsRepository,
    );

    expect(() => {
      return unreadNotification.execute({
        notificationId: 'fake-notification',
      });
    }).rejects.toThrow(NotificationNotFound);
  });
});
