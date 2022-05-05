import { join } from 'path';
import * as safeRequire from 'safe-require';
import { NX_JSON, PACKAGE_JSON, TURBO_JSON, WORKSPACE_JSON } from '../constants';
import { Logger } from '../logger';

/**
 * Load JSON file
 * @param cwd string
 * @param fileName string
 * @param logger Logger
 * @returns object
 */
export function loadJsonFile(cwd: string, fileName: string, logger: Logger): Record<string, any> {
  const filePath = join(cwd, fileName);

  logger.debug(`Loading json file ${filePath}`);

  const json = safeRequire(filePath);

  if (!json) {
    logger.debug(`File not found or invalid ${filePath}`);
  } else {
    logger.debug(`File loaded ${filePath}`);
  }

  return json;
}

export function loadNxJson(cwd: string, logger: Logger): Record<string, any> {
  return loadJsonFile(cwd, NX_JSON, logger);
}

export function loadNxWorkspaceJson(cwd: string, logger: Logger): Record<string, any> {
  return loadJsonFile(cwd, WORKSPACE_JSON, logger);
}

export function loadPackageJson(cwd: string, logger: Logger): Record<string, any> {
  return loadJsonFile(cwd, PACKAGE_JSON, logger);
}

export function loadTurboJson(cwd: string, logger: Logger): Record<string, any> {
  return loadJsonFile(cwd, TURBO_JSON, logger);
}
