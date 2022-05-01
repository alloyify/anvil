import { convertNxGenerator, logger, Tree } from '@alloyify/devkit';
import { LOG_PREFIX } from '../../constants';

export async function packageGenerator(tree: Tree, options: any): Promise<any> {
  logger.info(LOG_PREFIX, 'running package generator');
  return tree;
}

export default packageGenerator;

export const packageSchematic = convertNxGenerator(packageGenerator);
