const logger = {
  format: {
    combine: jest.fn(),
    colorize: jest.fn(),
    timestamp: jest.fn(),
    printf: jest.fn(),
  },
  transports: {
    Console: jest.fn(),
    File: jest.fn(),
  },
  createLogger: jest.fn().mockImplementation(() => ({
    info: jest.fn(),
    warn: jest.fn(),
    error: jest.fn(),
  })),
};

export const format = logger.format;
export const createLogger = logger.createLogger;
export default logger;
