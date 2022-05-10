import { readFileSync } from 'fs';
import { join } from 'path';
import * as yaml from 'yaml';
import { PNPM_WORKSPACE_YAML } from '../constants';
import { Logger } from '../logger';

export function readYamlFile(
  cwd: string,
  fileName: string,
  logger: Logger,
): {
  content: string;
  filePath: string;
} {
  const exts = ['yaml', 'yml'];
  let content: string;
  let filePath: string;

  for (let i = 0; i < exts.length; i++) {
    const ext = exts[i];
    filePath = join(cwd, `${fileName}.${ext}`);

    logger.debug(`loading yaml file ${filePath}`);

    try {
      content = readFileSync(filePath, { encoding: 'utf8' });

      if (content) {
        break;
      }
    } catch (e) {
      logger.debug(`error loading yaml file ${filePath}`);
      logger.debug(e);
    }
  }

  return {
    content,
    filePath,
  };
}

export function loadYamlFile(cwd: string, fileName: string, logger: Logger): Record<string, any> {
  const { content, filePath } = readYamlFile(cwd, fileName, logger);
  let parsed: string;

  if (!content) {
    return undefined;
  }

  try {
    parsed = yaml.parse(content);
  } catch (e) {
    logger.debug(`error parsing yaml file ${filePath}`);
    logger.debug(e);

    return undefined;
  }

  logger.debug(`file loaded ${filePath}`);

  return parsed as any;
}

export function loadPnpmYaml(cwd: string, logger: Logger): { packages: string[] } & Record<string, any> {
  return loadYamlFile(cwd, PNPM_WORKSPACE_YAML, logger) as any;
}
