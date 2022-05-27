import { generateFiles, join, Logger, Tree } from '@alloyify/devkit';
import { WorkspaceGeneratorOptions, WorkspaceGeneratorOptionsTransformed } from '../schema';

export function createFiles(
  tree: Tree,
  target: string,
  mergedOptions: WorkspaceGeneratorOptions & WorkspaceGeneratorOptionsTransformed,
  logger: Logger,
): void {
  logger.debug('createFiles');
  generateFiles(tree, join(__dirname, '..', 'files'), target, {
    dot: '.',
    tmpl: '',
    ...mergedOptions,
  });
}
