import { AsyncLocalStorage } from 'async_hooks';
import type pino from 'pino';

type StorageT = Record<string, any> & {
  logger: pino.Logger<never, boolean>;
};

export const asyncLocalStorage = new AsyncLocalStorage<StorageT>();
