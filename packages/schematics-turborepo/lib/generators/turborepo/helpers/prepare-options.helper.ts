import {
  Logger,
  names,
  PACKAGE_LICENSE_DEFAULT,
  PNPM_WORKSPACE_DEFAULT,
  resolvePackageAccess,
  resolvePackageRegistry,
  resolveWorkspace,
} from '@alloyify/devkit';
import { TurborepoGeneratorOptions, TurborepoGeneratorOptionsTransformed } from '../schema';

export function transformOptions(
  options: TurborepoGeneratorOptions,
  logger: Logger,
): TurborepoGeneratorOptionsTransformed {
  logger.debug('transformOptions');

  return {
    nameT: names(options.name),
    workspaceT: names(options.workspace),
    scopeT: names(options.scope),
  };
}

export function validateOptions(options: TurborepoGeneratorOptions, logger: Logger): TurborepoGeneratorOptions {
  logger.debug('validateOptions');

  options.cwd = options.cwd ?? process.cwd();
  logger.debug(`CWD ${options.cwd}`);

  options.workspace = resolveWorkspace([PNPM_WORKSPACE_DEFAULT], options.workspace, logger);
  options.scope = options.scope ?? '';
  options.license = options.license ?? PACKAGE_LICENSE_DEFAULT;
  options.access = resolvePackageAccess({ access: options.access }, options.access, logger);
  options.registry = resolvePackageRegistry({ registry: options.registry }, options.registry, logger);
  options.repository = options.repository ?? '';
  options.authorName = options.authorName ?? '';
  options.authorEmail = options.authorEmail ?? '';

  return options;
}
