import { readProjectConfiguration, Tree, updateProjectConfiguration } from '@alloyify/devkit';

export function updateProjectWorkspaceJson(tree: Tree, projectName: string): void {
  const projectConfig = readProjectConfiguration(tree, projectName);

  updateProjectConfiguration(tree, projectName, {
    ...projectConfig,
    targets: {
      ...projectConfig.targets,
      build: {
        ...projectConfig.targets.build,
        configurations: {},
      },
    },
  });
}
