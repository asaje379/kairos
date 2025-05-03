import { Request, Response, Router } from 'express';
import { CreateSubscriberDto } from './subscriber.dto';
import { subscriberService } from './subscriber.service';

export const subscriberRouter = Router();

subscriberRouter.post('/', async (req: Request, res: Response) => {
  const data = req.body as CreateSubscriberDto;
  try {
    const subscriber = await subscriberService.create(data);
    res.status(201).json(subscriber);
  } catch (error) {
    res.status(500).json({
      error: 'INTERNAL_ERROR',
    });
  }
});

subscriberRouter.get('/:slugOrApiKey', async (req: Request, res: Response) => {
  const slugOrApiKey = req.params.slugOrApiKey as string;

  if (!slugOrApiKey) {
    res.status(400).json({
      error: 'BAD_REQUEST',
      message: 'Slug or apiKey required',
    });
  }

  try {
    const subscriber = await subscriberService.getSubscriber(slugOrApiKey);
    res.status(200).json(subscriber);
  } catch (error: any) {
    if (error.message === 'not_found') {
      res.status(404).json({
        error: 'NOT_FOUND',
        message: `Subscriber with slug or api key ${slugOrApiKey} not found`,
      });
    }
    res.status(500).json({
      error: 'INTERNAL_ERROR',
    });
  }
});
