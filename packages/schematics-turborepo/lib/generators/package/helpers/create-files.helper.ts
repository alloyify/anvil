import { generateFiles, join, Tree } from '@alloyify/devkit';
import { PackageGeneratorOptions } from '../schema';

export function createFiles(tree: Tree, target: string, options: PackageGeneratorOptions): void {
  generateFiles(tree, join(__dirname, '..', 'files'), target, { tmpl: '', ...options });
}
