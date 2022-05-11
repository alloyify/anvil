import { generateFiles, join, Logger, Tree } from '@alloyify/devkit';
import { PackageGeneratorOptions } from '../schema';

export function createFiles(tree: Tree, target: string, options: PackageGeneratorOptions, logger: Logger): void {
  logger.debug('createFiles');
  generateFiles(tree, join(__dirname, '..', 'files'), target, { tmpl: '', ...options });
}
