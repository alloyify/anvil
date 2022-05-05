import { pino, Logger, LoggerOptions } from 'pino';
import { GeneratorsRunnerType } from '../constants';

let logger: Logger;
let loggerPretty: Logger;

export function getLogger(type?: GeneratorsRunnerType, options: LoggerOptions = {}): Logger {
  const level = process.env.LOG_LEVEL;
  const defaultOptions: LoggerOptions = {
    name: type,
  };

  if (level) {
    defaultOptions.level = level;
  }

  switch (type) {
    case GeneratorsRunnerType.ANVIL:
      if (!loggerPretty) {
        loggerPretty = pino({
          ...defaultOptions,
          transport: {
            target: './logger-pretty.options',
          },
          ...options,
        });
      }

      return loggerPretty;

    default:
      if (!logger) {
        logger = pino({
          ...defaultOptions,
          ...options,
        });
      }

      return logger;
  }
}

export type { Logger } from 'pino';
