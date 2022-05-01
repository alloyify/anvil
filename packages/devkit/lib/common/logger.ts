import * as colors from 'chalk';
import * as log from 'npmlog';
import { LOGGER_NAME } from '../constants';

(log as any).heading = colors.cyan(LOGGER_NAME);

export const logger = log;
