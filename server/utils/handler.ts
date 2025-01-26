import type { EventHandler, EventHandlerRequest } from 'h3';

export const defineWrappedEventHandler = <T extends EventHandlerRequest, D>(
  handler: EventHandler<T, D>,
): EventHandler<T, D> =>
  defineEventHandler<T>(async (event) => {
    const logger = event.node.req.log;
    const startTime = Date.now();
    logger.info(`Request received: ${event.node.req.url}`);
    return asyncLocalStorage.run({ logger }, async () => {
      try {
        const response = await handler(event);
        // do something after the route handler
        return response;
      } catch (err) {
        // Error handling
        return { err };
      } finally {
        logger.info(`Request completed in ${Date.now() - startTime}ms`);
      }
    });
  });
