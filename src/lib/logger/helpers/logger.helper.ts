import { TransformableInfo } from 'logform';

export const formatLogMessage = (info: TransformableInfo) => {
  const { timestamp, context, level, message, ...rest } = info;
  return `${timestamp} - ${context} - [${level}] ${message} ${JSON.stringify(
    rest
  )}`;
};
