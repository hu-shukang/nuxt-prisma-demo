const getLogger = () => {
  const store = asyncLocalStorage.getStore();
  return store?.logger ?? console;
};

export const logger = {
  info: (message: string) => {
    getLogger().info(message);
  },
  error: (message: string) => {
    getLogger().error(message);
  },
  warn: (message: string) => {
    getLogger().warn(message);
  },
  debug: (message: string) => {
    getLogger().debug(message);
  },
};
