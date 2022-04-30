import * as colors from 'chalk';
import * as log from 'npmlog';
import { ANVIL } from '../constants';

(log as any).heading = colors.cyan(ANVIL);

export const logger = log;
