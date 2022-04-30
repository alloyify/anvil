import { join } from 'path';
import * as safeRequire from 'safe-require';
import { NX_JSON, PACKAGE_JSON, TURBO_JSON, WORKSPACE_JSON } from '../constants';

export function loadNxJson(cwd?: string): Record<string, any> {
  return safeRequire(join(cwd ?? process.cwd(), NX_JSON));
}

export function loadPackageJson(cwd?: string): Record<string, any> {
  return safeRequire(join(cwd ?? process.cwd(), PACKAGE_JSON));
}

export function loadTurboJson(cwd?: string): Record<string, any> {
  return safeRequire(join(cwd ?? process.cwd(), TURBO_JSON));
}

export function loadWorkspaceJson(cwd?: string): Record<string, any> {
  return safeRequire(join(cwd ?? process.cwd(), WORKSPACE_JSON));
}
