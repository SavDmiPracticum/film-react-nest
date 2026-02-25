import { TskvLogger } from './tskv';

describe('test JsonLogger', () => {
  let logger: TskvLogger;
  let testLog: jest.SpyInstance;
  let testError: jest.SpyInstance;
  let testWarn: jest.SpyInstance;
  let testDebug: jest.SpyInstance;

  beforeEach(async () => {
    logger = new TskvLogger();
    testLog = jest.spyOn(console, 'log').mockImplementation(() => {});
    testError = jest.spyOn(console, 'error').mockImplementation(() => {});
    testWarn = jest.spyOn(console, 'warn').mockImplementation(() => {});
    testDebug = jest.spyOn(console, 'debug').mockImplementation(() => {});
  });

  afterEach(() => {
    testLog.mockRestore();
    testError.mockRestore();
    testWarn.mockRestore();
    testDebug.mockRestore();
  });

  it('logger should be defined', () => {
    expect(logger).toBeDefined();
  });

  it('test level log', () => {
    logger.log('test log', 'test optionalParams');
    expect(testLog).toHaveBeenCalled();
    const message = testLog.mock.calls[0][0];
    expect(message).toBe(
      'level=log\tmessage=test log\toptionalParams=test optionalParams\n',
    );
  });

  it('test level error', () => {
    logger.error('test error', 'test optionalParams');
    expect(testError).toHaveBeenCalled();
    const message = testError.mock.calls[0][0];
    expect(message).toBe(
      'level=error\tmessage=test error\toptionalParams=test optionalParams\n',
    );
  });

  it('test level warn', () => {
    logger.warn('test warn', 'test optionalParams');
    expect(testWarn).toHaveBeenCalled();
    const message = testWarn.mock.calls[0][0];
    expect(message).toBe(
      'level=warn\tmessage=test warn\toptionalParams=test optionalParams\n',
    );
  });

  it('test level debug', () => {
    logger.debug('test debug', 'test optionalParams');
    expect(testDebug).toHaveBeenCalled();
    const message = testDebug.mock.calls[0][0];
    expect(message).toBe(
      'level=debug\tmessage=test debug\toptionalParams=test optionalParams\n',
    );
  });
});
