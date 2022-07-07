import { nxApplicationGenerator, NX_GENERATORS_DEFAULT_OPTIONS, Tree } from '@alloyify/devkit';
import type { ApplicationGeneratorOptionsTransformed } from '../schema';

export async function generateNodeApplication(
  tree: Tree,
  options: ApplicationGeneratorOptionsTransformed,
): Promise<void> {
  await nxApplicationGenerator(tree, {
    name: options.nameT.fileName,
    directory: options.directoryT.fileName,
    skipFormat: true,
    standaloneConfig: false,
    skipPackageJson: true,
    ...(NX_GENERATORS_DEFAULT_OPTIONS as any),
  });
}
