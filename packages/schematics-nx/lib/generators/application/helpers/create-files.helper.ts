import { generateFiles, join, Logger, Tree } from '@alloyify/devkit';
import { ApplicationGeneratorOptions, ApplicationGeneratorOptionsTransformed } from '../schema';

export function createFiles(
  tree: Tree,
  target: string,
  mergedOptions: ApplicationGeneratorOptions & ApplicationGeneratorOptionsTransformed,
  logger: Logger,
): void {
  logger.debug('createFiles');

  const runGenerateFiles = (filesPath: string, forAppRoot = false): void =>
    generateFiles(tree, join(__dirname, '..', 'files', filesPath), forAppRoot ? target : join(target, 'src'), {
      dot: '.',
      tmpl: '',
      ...mergedOptions,
    });

  runGenerateFiles(mergedOptions.type);
  runGenerateFiles(`${mergedOptions.type}-app-root`, true);
}
