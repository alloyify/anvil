import { isArray } from 'lodash';
import { PNPM_DEFAULT_WORKSPACE, PNPM_WORKSPACE_YAML } from '../constants';
import { CwdConfigs } from '../interfaces';
import { Logger } from '../logger';

export function resolveWorkspace(cwdConfigs: CwdConfigs, workspace: string, logger: Logger): string {
  logger.debug('resolveWorkspace');

  const { pnpmWorkspaceYaml } = cwdConfigs;
  const pnpmWorkspaces = pnpmWorkspaceYaml?.[PNPM_DEFAULT_WORKSPACE];

  if (!isArray(pnpmWorkspaces)) {
    logger.error(`${PNPM_WORKSPACE_YAML} file should contain "${PNPM_DEFAULT_WORKSPACE}" fieled`);
    process.exit(1);
  }

  if (!pnpmWorkspaces.length) {
    logger.error(`"${PNPM_DEFAULT_WORKSPACE}" in ${PNPM_WORKSPACE_YAML} file should contain the list of workspaces`);
    process.exit(1);
  }

  const workspacesList = pnpmWorkspaces.map((one: string) => one.split('/*')[0]);
  const firstWorkspace = workspacesList[0];
  const defaultWorkspace = firstWorkspace ?? PNPM_DEFAULT_WORKSPACE;

  if (!workspace) {
    logger.info(`workspace wasn't provided. Using default "${defaultWorkspace}"`);
    return defaultWorkspace;
  }

  const resolvedWorkspace = workspacesList.find((one: string) => one === workspace);

  if (!resolvedWorkspace) {
    logger.warn(`workspace "${workspace}" wasn't found. Using default "${defaultWorkspace}"`);
    return defaultWorkspace;
  }

  logger.info(`using workspace "${resolvedWorkspace}"`);

  return resolvedWorkspace;
}
