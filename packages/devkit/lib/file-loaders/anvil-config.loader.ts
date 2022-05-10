import { loadJsonFile } from './json.loaders';
import { loadYamlFile } from './yaml.loaders';
import { ANVIL_CONFIG } from '../constants';
import { AnvilConfig } from '../interfaces';
import { Logger } from '../logger';

export function loadAnvilConfig(cwd: string, logger: Logger): AnvilConfig {
  return loadJsonFile(cwd, ANVIL_CONFIG, logger) ?? loadYamlFile(cwd, ANVIL_CONFIG, logger);
}
