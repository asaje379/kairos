import { Prisma } from '../../../generated/prisma';

export type CreateSubscriberDto = Omit<
  Prisma.SubscriberUncheckedCreateInput,
  'publicKey' | 'privateKey'
>;
