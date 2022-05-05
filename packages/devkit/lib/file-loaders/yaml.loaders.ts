import { readFileSync } from 'fs';
import { join } from 'path';
import * as yaml from 'yaml';
import { PNPM_WORKSPACE_YAML } from '../constants';
import { Logger } from '../logger';

/**
 * Load YAML file
 * @param cwd string
 * @param fileName string
 * @param logger Logger
 * @returns object
 */
export function loadYamlFile(cwd: string, fileName: string, logger: Logger): Record<string, any> {
  const filePath = join(cwd, fileName);
  let content: string;
  let parsed: string;

  logger.debug(`Loading yaml file ${filePath}`);

  try {
    content = readFileSync(filePath, { encoding: 'utf8' });
  } catch (e) {
    logger.debug(`Error loading yaml file ${filePath}`);
    logger.debug(e);

    return undefined;
  }

  try {
    parsed = yaml.parse(content);
  } catch (e) {
    logger.debug(`Error parsing yaml file ${filePath}`);
    logger.debug(e);

    return undefined;
  }

  logger.debug(`File loaded ${filePath}`);

  return parsed as any;
}

export function loadPnpmYaml(cwd: string, logger: Logger): { packages: string[] } & Record<string, any> {
  return loadYamlFile(cwd, PNPM_WORKSPACE_YAML, logger) as any;
}
