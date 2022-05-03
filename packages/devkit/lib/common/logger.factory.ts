import { pino, Logger, LoggerOptions } from 'pino';

export function createLogger(options: LoggerOptions = {}): Logger {
  return pino(options);
}
