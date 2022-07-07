import { Logger, names } from '@alloyify/devkit';
import { ApplicationGeneratorOptions, ApplicationGeneratorOptionsTransformed } from '../schema';

export function transformOptions(
  options: ApplicationGeneratorOptions,
  logger: Logger,
): ApplicationGeneratorOptionsTransformed {
  logger.debug('transformOptions');

  const nameT = names(options.name);
  const directoryT = names(options.directory);
  const directoryName = options.directory ? `${directoryT.fileName}/${nameT.fileName}` : nameT.fileName;

  return {
    nameT,
    directoryT,
    directoryName,
  };
}

export function validateOptions(options: ApplicationGeneratorOptions, logger: Logger): ApplicationGeneratorOptions {
  logger.debug('validateOptions');

  options.cwd = options.cwd ?? process.cwd();
  options.directory = options.directory ?? '';
  logger.debug(`CWD ${options.cwd}`);

  return options;
}
