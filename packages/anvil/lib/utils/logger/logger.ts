import { createLogger } from '@alloyify/devkit';
import { LOGGER_NAME } from '../../constants';

export const logger = createLogger({
  name: LOGGER_NAME,
  transport: {
    target: './logger.options',
  },
});
