import logger from 'pino-http';

export default fromNodeMiddleware(
  logger({
    level: 'info',
    transport: {
      target: 'pino-pretty',
      options: {
        colorize: process.env.NODE_ENV !== 'production',
        translateTime: 'SYS:standard',
        ignore: 'req,res,responseTime,pid,hostname',
        messageFormat: '[reqId:{req.id}] - {msg}',
      },
    },
    genReqId: (req) => req.headers['x-tracing-id'] || req.id,
    autoLogging: false,
  }),
);
