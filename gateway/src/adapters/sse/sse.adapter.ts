import { Application, Request, Response } from 'express';
import { Adapter } from '..';
import { redis } from '../../common/redis';

export class SseAdapter extends Adapter {
  init(app: Application) {
    app.get('/sse/events', this.connect.bind(this));
    app.post('/sse/notify', this.handleNotify.bind(this));
  }

  formatMessage(message: string) {
    return `data: ${message}\n\n`;
  }

  connect(req: Request, res: Response) {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    res.write(this.formatMessage('Connected!'));

    redis.subscribe('global');
    redis.addListener('global', (message: string) => {
      console.log('New global event');
      res.write(this.formatMessage(message));
    });
  }

  handleNotify(req: Request, res: Response) {
    const body = req.body;
    redis.publish('global', body);
    res.status(200).end();
  }
}
