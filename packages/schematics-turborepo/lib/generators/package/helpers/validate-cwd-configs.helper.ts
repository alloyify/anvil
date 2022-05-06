import { getCwdConfigs, Logger, PNPM_WORKSPACE_YAML } from '@alloyify/devkit';
import { PackageGeneratorOptions } from '../schema';

export function validateCwdConfigs(options: PackageGeneratorOptions, logger: Logger): void {
  logger.debug('validateCwdConfigs');

  options.cwd = options.cwd ?? process.cwd();

  logger.debug(`CWD ${options.cwd}`);

  options.cwdConfigs = getCwdConfigs(options, logger);

  if (!options.cwdConfigs.turboJson) {
    logger.error('Current working directory is not a Turborepo');
    process.exit(1);
  }

  if (!options.cwdConfigs.pnpmWorkspaceYaml) {
    logger.error(`${PNPM_WORKSPACE_YAML} is invalid or missing`);
    process.exit(1);
  }
}
