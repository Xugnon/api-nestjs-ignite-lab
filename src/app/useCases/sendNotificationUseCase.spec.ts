import { InMemoryNotificationsRepository } from '@test/repositories/inMemoryNotificationsRepository';
import { SendNotificationUseCase } from './sendNotificationUseCase';

describe('Send Notification', () => {
  it('should be able t send a notification', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const sendNotification = new SendNotificationUseCase(
      notificationsRepository,
    );

    const { notification } = await sendNotification.execute({
      content: 'This is a notification',
      category: 'Notification',
      recipientId: 'example_id',
    });

    expect(notificationsRepository.notifications).toHaveLength(1);
    expect(notificationsRepository.notifications[0]).toEqual(notification);
  });
});
