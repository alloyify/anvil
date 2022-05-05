import { convertNxGenerator, GeneratorsRunnerType, getLogger, join, Tree } from '@alloyify/devkit';
import { createFiles, transformOptions, validateOptions } from './helpers';
import { PackageGeneratorOptions } from './schema';

export async function packageGenerator(tree: Tree, options: PackageGeneratorOptions): Promise<any> {
  const logger = getLogger(options.type);
  logger.info('running schematic');

  // validateOptions(options);
  // transformOptions(options);
  // createFiles(tree, join('packages', options.nameT.fileName), options);

  return tree;
}

export default packageGenerator;

export const packageSchematic = convertNxGenerator(packageGenerator);
