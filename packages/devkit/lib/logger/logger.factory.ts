import { pino, Logger, LoggerOptions } from 'pino';
import { GeneratorsRunnerType } from '../constants';

let logger: Logger;
let loggerPretty: Logger;

export function getLogger(type: GeneratorsRunnerType, options: LoggerOptions = {}): Logger {
  switch (type) {
    case GeneratorsRunnerType.ANVIL:
      if (!loggerPretty) {
        loggerPretty = pino({
          name: type,
          transport: {
            target: './logger.options',
          },

          ...options,
        });
      }

      return loggerPretty;

    default:
      if (!logger) {
        logger = pino({
          name: type,
          ...options,
        });
      }

      return logger;
  }
}

export type { Logger } from 'pino';
