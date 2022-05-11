import { isArray } from 'lodash';
import { PNPM_WORKSPACE_DEFAULT, PNPM_PACKAGES_FIELD, PNPM_WORKSPACE_YAML } from '../constants';
import { CwdConfigs } from '../interfaces';
import { Logger } from '../logger';

export function getWorkspacesList(pnpmWorkspaceYaml: CwdConfigs['pnpmWorkspaceYaml'], logger: Logger): string[] {
  logger.debug('getWorkspacesList');

  const pnpmWorkspaces = pnpmWorkspaceYaml?.[PNPM_PACKAGES_FIELD];

  if (!isArray(pnpmWorkspaces)) {
    logger.error(`${PNPM_WORKSPACE_YAML} file should contain "${PNPM_PACKAGES_FIELD}" fieled`);
    process.exit(1);
  }

  if (!pnpmWorkspaces.length) {
    logger.error(`"${PNPM_PACKAGES_FIELD}" in ${PNPM_WORKSPACE_YAML} file should contain the list of workspaces`);
    process.exit(1);
  }

  const workspacesList = pnpmWorkspaces.map((one: string) => one.split('/*')[0]);

  logger.debug(`pnpm workspaces list: ${workspacesList}`);

  return workspacesList;
}

export function resolveWorkspace(
  workspacesList: CwdConfigs['workspacesList'],
  workspace: string,
  logger: Logger,
): string {
  logger.debug('resolveWorkspace');

  const firstWorkspace = workspacesList[0];
  const defaultWorkspace = firstWorkspace ?? PNPM_WORKSPACE_DEFAULT;

  if (!workspace) {
    logger.debug(`workspace wasn't provided. Using default "${defaultWorkspace}"`);
    return defaultWorkspace;
  }

  const resolvedWorkspace = workspacesList.find((one: string) => one === workspace);

  if (!resolvedWorkspace) {
    logger.debug(`workspace "${workspace}" wasn't found. Using default "${defaultWorkspace}"`);
    return defaultWorkspace;
  }

  logger.debug(`using workspace "${resolvedWorkspace}"`);
  return resolvedWorkspace;
}
