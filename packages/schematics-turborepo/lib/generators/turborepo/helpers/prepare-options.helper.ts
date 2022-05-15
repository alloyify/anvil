import {
  Logger,
  names,
  PackageRegistry,
  PackageRegistryUrl,
  PACKAGE_LICENSE_DEFAULT,
  PNPM_WORKSPACE_DEFAULT,
  resolvePackageAccess,
  resolvePackageRegistry,
  resolveWorkspace,
} from '@alloyify/devkit';
import {
  TurborepoGeneratorOptions,
  TurborepoGeneratorOptionsCalculated,
  TurborepoGeneratorOptionsTransformed,
} from '../schema';

export function calulateTepmlateOptions(
  options: TurborepoGeneratorOptions,
  logger: Logger,
): TurborepoGeneratorOptionsCalculated {
  logger.debug('calulateTepmlateOptions');

  const calculated: TurborepoGeneratorOptionsCalculated = {
    npmRegistryUrlLine: `${options.scope ? `@${options.scope}:` : ''}registry=https://${
      PackageRegistryUrl[options.registry]
    }`,
    npmTokenLine: `//${PackageRegistryUrl[options.registry]}/:_authToken=$NPM_TOKEN`,
    npmTokenCiEnvName: options.registry === PackageRegistry.NPM ? 'NPM_TOKEN' : 'GITHUB_TOKEN',
    githubFolder: '.github',
    huskyFolder: '.husky',
    changesetFolder: '.changeset',
  };

  return calculated;
}

export function transformOptions(
  options: TurborepoGeneratorOptions,
  logger: Logger,
): TurborepoGeneratorOptionsTransformed {
  logger.debug('transformOptions');

  return {
    nameT: names(options.name),
    workspaceT: names(options.workspace),
    scopeT: names(options.scope),
    registryUrl: PackageRegistryUrl[options.registry],
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
