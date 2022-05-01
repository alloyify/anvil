import { convertNxGenerator, join, logger, Tree } from '@alloyify/devkit';
import { LOG_PREFIX } from '../../constants';
import { createFiles, transformOptions } from './helpers';
import { PackageGeneratorOptions } from './schema';

export async function packageGenerator(tree: Tree, options: PackageGeneratorOptions): Promise<any> {
  logger.info(LOG_PREFIX, '"package"');

  transformOptions(options);
  createFiles(tree, join('packages', options.nameT.fileName), options);

  return tree;
}

export default packageGenerator;

export const packageSchematic = convertNxGenerator(packageGenerator);
