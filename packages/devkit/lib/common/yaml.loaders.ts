import { readFileSync } from 'fs';
import { join } from 'path';
import * as yaml from 'yaml';
import { PNPM_WORKSPACE_YAML } from '../constants';

export function loadYamlFile(fileName: string, cwd?: string): Record<string, any> {
  let content: string;
  let parsed: string;

  try {
    content = readFileSync(join(cwd ?? process.cwd(), fileName), { encoding: 'utf8' });
  } catch (e) {
    // TODO: add logging
    return undefined;
  }

  try {
    parsed = yaml.parse(content);
  } catch (e) {
    // TODO: add logging
    return undefined;
  }

  return parsed as any;
}

export function loadPnpmYaml(cwd?: string): Record<string, any> {
  return loadYamlFile(PNPM_WORKSPACE_YAML, cwd);
}
