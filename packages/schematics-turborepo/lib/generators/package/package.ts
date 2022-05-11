import { convertNxGenerator, getLogger, join, resolveWorkspace, Tree } from '@alloyify/devkit';
import { createFiles, transformNames, validateCwdConfigs } from './helpers';
import { PackageGeneratorOptions } from './schema';

export async function packageGenerator(tree: Tree, options: PackageGeneratorOptions): Promise<any> {
  const logger = getLogger(options.runnerType);

  logger.debug('run packageGenerator with options:');
  logger.debug(options);

  validateCwdConfigs(options, logger);
  transformNames(options, logger);

  const workspace = resolveWorkspace(options.cwdConfigs, options.workspaceT.fileName, logger);

  createFiles(tree, join(workspace, options.nameT.fileName), options, logger);

  return tree;
}

export default packageGenerator;

export const packageSchematic = convertNxGenerator(packageGenerator);
