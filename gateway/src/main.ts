import express, { json } from 'express';
import { Env } from './common/env';
import { SseAdapter } from './adapters/sse/sse.adapter';
import { WebsocketAdapter } from './adapters/websocket/websocket.adapter';
import cors from 'cors';
import { subscriberRouter } from './core/subscribers/subscriber.controller';

const app = express();
app.use(cors());
app.use(json());

app.use('/subscribers', subscriberRouter);

const adapters = [new SseAdapter(), new WebsocketAdapter()];

for (const adapter of adapters) {
  adapter.init(app);
}

app.listen(Env.port, () => {
  console.log(`Server is running on port ${Env.port}`);
});
