import { prisma } from '../../common/database';
import { CreateSubscriberDto } from './subscriber.dto';

class SubscriberService {
  async create(data: CreateSubscriberDto) {
    try {
      return await prisma.subscriber.create({
        data,
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async getSubscriber(slugOrApiKey: string) {
    const subscriber = await prisma.subscriber.findFirst({
      where: {
        OR: [{ slug: slugOrApiKey }, { apiKey: slugOrApiKey }],
      },
    });
    if (!subscriber) {
      throw 'not_found';
    }
    return subscriber;
  }
}

export const subscriberService = new SubscriberService();
