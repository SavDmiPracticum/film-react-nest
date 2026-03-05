import { JsonLogger } from './json';

describe('test JsonLogger', () => {
  let logger: JsonLogger;
  let testLog: jest.SpyInstance;
  let testError: jest.SpyInstance;
  let testWarn: jest.SpyInstance;
  let testDebug: jest.SpyInstance;

  beforeEach(async () => {
    logger = new JsonLogger();
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
    const data = JSON.parse(message);
    expect(data.level).toBe('log');
    expect(data.message).toBe('test log');
    console.log(data.optionalParams);
    expect(data.optionalParams).toEqual(new Array(['test optionalParams']));
  });

  it('test level error', () => {
    logger.error('test error', 'test optionalParams');
    expect(testError).toHaveBeenCalled();
    const message = testError.mock.calls[0][0];
    const data = JSON.parse(message);
    expect(data.level).toBe('error');
    expect(data.message).toBe('test error');
    expect(data.optionalParams).toEqual(new Array(['test optionalParams']));
  });

  it('test level warn', () => {
    logger.warn('test warn', 'test optionalParams');
    expect(testWarn).toHaveBeenCalled();
    const message = testWarn.mock.calls[0][0];
    const data = JSON.parse(message);
    expect(data.level).toBe('warn');
    expect(data.message).toBe('test warn');
    expect(data.optionalParams).toEqual(new Array(['test optionalParams']));
  });

  it('test level debug', () => {
    logger.debug('test debug', 'test optionalParams');
    expect(testDebug).toHaveBeenCalled();
    const message = testDebug.mock.calls[0][0];
    const data = JSON.parse(message);
    expect(data.level).toBe('debug');
    expect(data.message).toBe('test debug');
    expect(data.optionalParams).toEqual(new Array(['test optionalParams']));
  });
});
