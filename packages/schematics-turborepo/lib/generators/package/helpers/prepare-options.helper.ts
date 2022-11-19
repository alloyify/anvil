import { getCwdConfigs, Logger, names, resolveWorkspace } from '@alloyify/devkit';
import { isNil } from 'lodash';
import { PackageGeneratorOptions, PackageGeneratorOptionsTransformed } from '../schema';

export function transformOptions(options: PackageGeneratorOptions, logger: Logger): PackageGeneratorOptionsTransformed {
  logger.debug('transformOptions');

  const transformedOptions: any = {};

  transformedOptions.packageNameT = names(options.packageName);
  transformedOptions.scopeT = names(options.scope);
  transformedOptions.packageNameFull = transformedOptions.scopeT.fileName
    ? `@${transformedOptions.scopeT.fileName}/${transformedOptions.packageNameT.fileName}`
    : transformedOptions.packageNameT.fileName;

  return transformedOptions as PackageGeneratorOptionsTransformed;
}

export function validateOptions(options: PackageGeneratorOptions, logger: Logger): PackageGeneratorOptions {
  logger.debug('validateOptions');

  options.cwd = options.cwd ?? process.cwd();
  logger.debug(`CWD ${options.cwd}`);

  options.cwdConfigs = getCwdConfigs(options, logger);
  const fromAnvilConfig = options.cwdConfigs.dotAnvilConfig?.generators?.package ?? {};

  if (!options.cwdConfigs.turboJson) {
    logger.error('Current working directory is not a Turborepo');
    process.exit(1);
  }

  options.workspace = resolveWorkspace(options.cwdConfigs.workspacesList, options.workspace, logger);
  options.scope = !isNil(options.scope) ? options.scope : fromAnvilConfig.scope;
  options.license = !isNil(options.license) ? options.license : fromAnvilConfig.license;
  options.access = !isNil(options.access) ? options.access : fromAnvilConfig.access;
  options.authorName = !isNil(options.authorName) ? options.authorName : fromAnvilConfig.author?.name ?? '';
  options.authorEmail = !isNil(options.authorEmail) ? options.authorEmail : fromAnvilConfig.author?.email ?? '';
  options.repository = options.cwdConfigs.packageJson.repository ?? '';

  return options;
}
