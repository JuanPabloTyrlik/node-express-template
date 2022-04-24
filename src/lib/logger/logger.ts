import { createLogger, format } from 'winston';
import { Console, File } from 'winston/lib/winston/transports';
import { formatLogMessage } from './helpers/logger.helper';

export const logger = createLogger({
  level: 'info',
  format: format.combine(
    format.colorize(),
    format.timestamp(),
    format.printf(formatLogMessage)
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
