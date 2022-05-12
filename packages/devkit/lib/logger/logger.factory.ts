import * as color from 'chalk';
import * as log from 'npmlog';
import { pino, Logger, LoggerOptions } from 'pino';
import { GeneratorsRunnerType } from '../constants';

let logger: Logger;
let loggerPretty: Logger;

class AnvilLogger {
  constructor() {
    if (process.env.LOG_LEVEL === 'debug') {
      log.addLevel('debug', 10000, {});
      (log as any).level = 10000;
    }
    (log as any).heading = color.cyan(GeneratorsRunnerType.ANVIL);
  }

  public debug(msg?: any, ...args: any[]) {
    log.log('debug', '', msg, ...args);
  }

  public info(msg?: any, ...args: any[]) {
    log.info('', msg, ...args);
  }

  public warn(msg?: any, ...args: any[]) {
    log.warn('', msg, ...args);
  }

  public error(msg?: any, ...args: any[]) {
    log.error('', msg, ...args);
  }
}

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
        // this uses npmlog
        loggerPretty = new AnvilLogger() as any;
        // this uses pino-pretty
        // loggerPretty = pino({
        //   ...defaultOptions,
        //   transport: {
        //     target: './logger-pretty.options',
        //   },
        //   ...options,
        // });
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
