import { TransformableInfo } from 'logform';
import { formatLogMessage } from './logger.helper';

describe('formatLogMessage', () => {
  it('should format the log message', () => {
    const mockInfo: TransformableInfo = {
      message: 'MockMessage',
      level: 'info',
      context: 'LoggerHelper',
      timestamp: new Date().toISOString(),
      metadata: {
        attribute: 'value',
      },
    };

    const formattedMessage = formatLogMessage(mockInfo);

    expect(formattedMessage).toMatch(
      `${mockInfo.timestamp} - ${mockInfo.context} - [${mockInfo.level}] ${
        mockInfo.message
      } ${JSON.stringify({ metadata: mockInfo.metadata })}`
    );
  });
});
