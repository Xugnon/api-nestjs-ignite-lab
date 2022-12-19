import { makeNotification } from '@test/factories/notificationFactory';
import { InMemoryNotificationsRepository } from '@test/repositories/inMemoryNotificationsRepository';
import { NotificationNotFound } from './errors/notificationNotFound';
import { ReadNotificationUseCase } from './readNotificationUseCase';

describe('Read Notification', () => {
  it('should be able to read a notification', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const readNotification = new ReadNotificationUseCase(
      notificationsRepository,
    );

    const notification = makeNotification();

    await notificationsRepository.create(notification);

    await readNotification.execute({
      notificationId: notification.id,
    });

    expect(notificationsRepository.notifications[0].readAt).toEqual(
      expect.any(Date),
    );
  });

  it('should no be able to read a non existing notification', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const readNotification = new ReadNotificationUseCase(
      notificationsRepository,
    );

    expect(() => {
      return readNotification.execute({
        notificationId: 'fake-notification',
      });
    }).rejects.toThrow(NotificationNotFound);
  });
});
