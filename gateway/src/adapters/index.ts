import { Application } from 'express';

export abstract class Adapter {
  public abstract init(app: Application): void;
}
