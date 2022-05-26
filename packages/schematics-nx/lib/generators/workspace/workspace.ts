import { convertNxGenerator, getLogger, join, Tree } from '@alloyify/devkit';
import { execSync } from 'child_process';
import { inspect } from 'util';
// import { calulateTepmlateOptions, createFiles, transformOptions, validateOptions } from './helpers';
import { WorkspaceGeneratorOptions } from './schema';

export async function workspaceGenerator(tree: Tree, options: WorkspaceGeneratorOptions): Promise<any> {
  const logger = getLogger(options.runnerType);

  logger.debug('run workspaceGenerator with options:');
  logger.debug(inspect(options, true, null));
}

export default workspaceGenerator;

export const workspaceSchematics = convertNxGenerator(workspaceGenerator);
