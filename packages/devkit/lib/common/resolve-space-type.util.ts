import { CwdSpace } from '../interfaces';
import { loadNxJson, loadPackageJson, loadTurboJson, loadWorkspaceJson } from './json.loaders';

export function resolveSpaceType(cwd?: string): CwdSpace {
  if (!loadPackageJson(cwd)) {
    return 'empty';
  }

  if (loadNxJson(cwd) && loadWorkspaceJson(cwd)) {
    return 'nx';
  }

  if (loadTurboJson(cwd)) {
    return 'turborepo';
  }

  return 'not-monorepo';
}
