import { Logger, names } from '@alloyify/devkit';
import { WorkspaceGeneratorOptions, WorkspaceGeneratorOptionsTransformed } from '../schema';

export function transformOptions(
  options: WorkspaceGeneratorOptions,
  logger: Logger,
): WorkspaceGeneratorOptionsTransformed {
  logger.debug('transformOptions');

  return {
    nameT: names(options.name),
  };
}

export function validateOptions(options: WorkspaceGeneratorOptions, logger: Logger): WorkspaceGeneratorOptions {
  logger.debug('validateOptions');

  options.cwd = options.cwd ?? process.cwd();
  logger.debug(`CWD ${options.cwd}`);

  return options;
}
