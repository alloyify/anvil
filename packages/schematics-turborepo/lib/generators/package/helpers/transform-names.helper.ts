import { Logger, names } from '@alloyify/devkit';
import { PackageGeneratorOptions } from '../schema';

export function transformNames(options: PackageGeneratorOptions, logger: Logger) {
  logger.debug('transformNames');

  options.nameT = names(options.name);
  options.scopeT = names(options.scope);
  options.workspaceT = names(options.workspace);
  options.packageNpmName = options.scopeT.fileName
    ? `@${options.scopeT.fileName}/${options.nameT.fileName}`
    : options.nameT.fileName;
}
