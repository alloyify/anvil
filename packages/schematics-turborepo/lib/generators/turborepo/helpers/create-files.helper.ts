import { generateFiles, join, Logger, Tree } from '@alloyify/devkit';
import { TurborepoGeneratorOptions, TurborepoGeneratorOptionsTransformed } from '../schema';

export function createFiles(
  tree: Tree,
  target: string,
  mergedOptions: TurborepoGeneratorOptions & TurborepoGeneratorOptionsTransformed,
  logger: Logger,
): void {
  logger.debug('createFiles');
  generateFiles(tree, join(__dirname, '..', 'files'), target, { tmpl: '', ...mergedOptions });
}
