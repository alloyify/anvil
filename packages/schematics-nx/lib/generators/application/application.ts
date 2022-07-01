import { convertNxGenerator, getLogger, join, Tree } from '@alloyify/devkit';
import { execSync } from 'child_process';
import { inspect } from 'util';
import { ApplicationGeneratorOptions } from './schema';

export async function applicationGenerator(tree: Tree, options: ApplicationGeneratorOptions): Promise<any> {
  const logger = getLogger(options.runnerType);

  logger.debug('run applicationGenerator with options:');
  logger.debug(inspect(options, true, null));

  return tree;
}

export default applicationGenerator;

export const applicationSchematics = convertNxGenerator(applicationGenerator);
