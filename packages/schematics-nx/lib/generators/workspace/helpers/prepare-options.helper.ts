import { Logger, names } from '@alloyify/devkit';
import { WorkspaceGeneratorOptions, WorkspaceGeneratorOptionsTransformed } from '../schema';

export function transformOptions(
  options: WorkspaceGeneratorOptions,
  logger: Logger,
): WorkspaceGeneratorOptionsTransformed {
  logger.debug('transformOptions');

  return {
    nameT: names(options.name),
    scopeT: names(options.scope),
  };
}

export function validateOptions(options: WorkspaceGeneratorOptions, logger: Logger): WorkspaceGeneratorOptions {
  logger.debug('validateOptions');

  options.cwd = options.cwd ?? process.cwd();
  options.scope = options.scope ? options.scope : options.name;
  logger.debug(`CWD ${options.cwd}`);

  return options;
}
