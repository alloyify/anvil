import { convertNxGenerator, getLogger, join, Tree } from '@alloyify/devkit';
import { createFiles, transformOptions, validateOptions } from './helpers';
import { PackageGeneratorOptions } from './schema';

export async function packageGenerator(tree: Tree, options: PackageGeneratorOptions): Promise<any> {
  const logger = getLogger(options.runnerType);
  logger.info('running schematic');
  // logger.info(options.cwdConfigs.pnpmWorkspaceYaml);

  // validateOptions(options, logger);
  // transformOptions(options);
  // createFiles(tree, join('packages', options.nameT.fileName), options);

  return tree;
}

export default packageGenerator;

export const packageSchematic = convertNxGenerator(packageGenerator);
