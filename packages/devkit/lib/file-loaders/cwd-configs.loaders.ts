import { loadAnvilConfig } from './anvil-config.loader';
import { loadNxJson, loadNxWorkspaceJson, loadPackageJson, loadTurboJson } from './json.loaders';
import { loadPnpmYaml } from './yaml.loaders';
import { CwdConfigs, GeneratorBaseOptions } from '../interfaces';
import { Logger } from '../logger';

export function loadCwdConfigs(cwd: string, logger: Logger): CwdConfigs {
  const configs: CwdConfigs = {} as any;

  logger.debug(`loading CWD configs ${cwd}`);

  configs.packageJson = loadPackageJson(cwd, logger);
  configs.pnpmWorkspaceYaml = loadPnpmYaml(cwd, logger);
  configs.anvilConfig = loadAnvilConfig(cwd, logger);

  if (!configs.packageJson) {
    configs.cwdType = 'empty';

    logger.debug(`CWD type ${configs.cwdType}`);

    return configs;
  }

  configs.nxJson = loadNxJson(cwd, logger);
  configs.nxWorkspaceJson = loadNxWorkspaceJson(cwd, logger);

  if (configs.nxJson && configs.nxWorkspaceJson) {
    configs.cwdType = 'nx';

    logger.debug(`CWD type ${configs.cwdType}`);

    return configs;
  }

  configs.turboJson = loadTurboJson(cwd, logger);

  if (configs.turboJson) {
    configs.cwdType = 'turborepo';

    logger.debug(`CWD type ${configs.cwdType}`);

    return configs;
  }

  configs.cwdType = 'not-monorepo';

  logger.debug(`CWD type ${configs.cwdType}`);

  return configs;
}

export function getCwdConfigs(options: GeneratorBaseOptions, logger: Logger): CwdConfigs {
  return options.cwdConfigs ?? loadCwdConfigs(options.cwd, logger);
}
