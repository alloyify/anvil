import { generateFiles, join, Logger, Tree } from '@alloyify/devkit';
import {
  TurborepoGeneratorOptions,
  TurborepoGeneratorOptionsCalculated,
  TurborepoGeneratorOptionsTransformed,
} from '../schema';

export function createFiles(
  tree: Tree,
  target: string,
  mergedOptions: TurborepoGeneratorOptions & TurborepoGeneratorOptionsCalculated & TurborepoGeneratorOptionsTransformed,
  logger: Logger,
): void {
  logger.debug('createFiles');
  generateFiles(tree, join(__dirname, '..', 'files'), target, { tmpl: '', ...mergedOptions });
}
