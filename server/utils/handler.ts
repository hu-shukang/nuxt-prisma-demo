import type { EventHandler, EventHandlerRequest, H3Error } from 'h3';

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
        const h3Error = err as H3Error;
        logger.error(h3Error);
        sendError(
          event,
          createError({
            statusCode: h3Error.statusCode || 500,
            message: h3Error.message,
            statusMessage: h3Error.statusMessage,
            data: h3Error.data || {},
          }),
        );
      } finally {
        logger.info(`Request completed in ${Date.now() - startTime}ms`);
      }
    });
  });
