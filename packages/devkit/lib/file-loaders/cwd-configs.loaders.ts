import { getWorkspacesList } from '../pnpm';
import { loadAnvilConfig } from './anvil-config.loader';
import { loadNxJson, loadNxWorkspaceJson, loadPackageJson, loadTurboJson } from './json.loaders';
import { loadPnpmYaml } from './yaml.loaders';
import { CwdType } from '../constants';
import { CwdConfigs, GeneratorBaseOptions } from '../interfaces';
import { Logger } from '../logger';

export function loadCwdConfigs(cwd: string, logger: Logger): CwdConfigs {
  const configs: CwdConfigs = {} as any;

  logger.debug(`loading CWD configs ${cwd}`);

  configs.packageJson = loadPackageJson(cwd, logger);
  configs.anvilConfig = loadAnvilConfig(cwd, logger);
  configs.nxJson = loadNxJson(cwd, logger);
  configs.nxWorkspaceJson = loadNxWorkspaceJson(cwd, logger);
  configs.turboJson = loadTurboJson(cwd, logger);

  configs.cwdType = !configs.packageJson
    ? CwdType.EMPTY
    : configs.nxJson && configs.nxWorkspaceJson
    ? CwdType.NX
    : configs.turboJson
    ? CwdType.TURBOREPO
    : CwdType.NOT_MONOREPO;

  if (configs.cwdType === CwdType.NX || configs.cwdType === CwdType.TURBOREPO) {
    configs.pnpmWorkspaceYaml = loadPnpmYaml(cwd, logger);
    configs.workspacesList = getWorkspacesList(configs.pnpmWorkspaceYaml, logger);
  }

  logger.debug(`CWD type ${configs.cwdType}`);

  return configs;
}

export function getCwdConfigs(options: GeneratorBaseOptions, logger: Logger): CwdConfigs {
  return options.cwdConfigs ?? loadCwdConfigs(options.cwd, logger);
}
