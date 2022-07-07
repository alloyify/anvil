import { getWorkspaceLayout, joinPathFragments as join, Tree } from '@nrwl/devkit';
import { Logger } from '../logger';

export function getPathFromLayout(
  tree: Tree,
  directoryName: string,
  forPath: 'appsDir' | 'libsDir',
  logger: Logger,
): string {
  const path = join(getWorkspaceLayout(tree)[forPath], directoryName);

  logger.debug(`getPathFromLayout: ${path}`);

  return path;
}
