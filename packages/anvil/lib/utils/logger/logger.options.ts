import PinoPretty from 'pino-pretty';

const LOG_LEVELS_LABLES = {
  10: 'TRACE',
  20: 'DEBUG',
  30: 'INFO',
  40: 'WARN',
  50: 'ERROR',
};
const LOG_LEVEL_COLORS = {
  10: '\x1b[37m',
  20: '\x1b[34m',
  30: '\x1b[32m',
  40: '\x1b[33m',
  50: '\x1b[31m',
};
const LOG_NAME_COLOR = '\x1b[36m';
const LOG_MSG_COLOR = '\x1b[37m';

export default () =>
  PinoPretty({
    ignore: 'time,pid,hostname,name,level',
    messageFormat: (log: any) =>
      `${LOG_NAME_COLOR}${log.name} ${LOG_LEVEL_COLORS[log.level]}${LOG_LEVELS_LABLES[log.level]} ${LOG_MSG_COLOR}${
        log.msg
      }`,
  });
