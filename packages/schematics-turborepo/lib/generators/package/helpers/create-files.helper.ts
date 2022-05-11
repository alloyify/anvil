import { generateFiles, join, Logger, Tree } from '@alloyify/devkit';
import { PackageGeneratorOptions, PackageGeneratorOptionsTransformed } from '../schema';

export function createFiles(
  tree: Tree,
  target: string,
  mergedOptions: PackageGeneratorOptions & PackageGeneratorOptionsTransformed,
  logger: Logger,
): void {
  logger.debug('createFiles');
  generateFiles(tree, join(__dirname, '..', 'files'), target, { tmpl: '', ...mergedOptions });
}
