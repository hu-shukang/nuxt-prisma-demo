export default defineWrappedEventHandler(() => {
  logger.info('Hello, world!');
  return {
    message: 'Hello, world!',
  };
});
