import { createLogger, format } from 'winston';
import { Console, File } from 'winston/lib/winston/transports';

export const logger = createLogger({
  level: 'info',
  format: format.combine(
    format.colorize(),
    format.timestamp(),
    format.printf((info) => {
      const { timestamp, context, level, message, ...rest } = info;
      return `${timestamp} - ${context} - [${level}] ${message} ${JSON.stringify(
        rest
      )}`;
    })
  ),
  transports: [
    new Console(),
    new File({
      filename: 'errors.log',
      level: 'error',
    }),
    new File({ filename: 'events.log' }),
  ],
});
