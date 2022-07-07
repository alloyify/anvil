import { join, Tree } from '@alloyify/devkit';

export function cleanAfterGenerators(tree: Tree, appPath: string): void {
  const environmentTsPath = join(appPath, './src/environments/environment.ts');
  const environmentProdTsPath = join(appPath, './src/environments/environment.prod.ts');
  const appGitKeepPath = join(appPath, './src/app/.gitkeep');

  if (tree.exists(environmentTsPath)) {
    tree.delete(environmentTsPath);
  }

  if (tree.exists(environmentProdTsPath)) {
    tree.delete(environmentProdTsPath);
  }

  if (tree.exists(appGitKeepPath)) {
    tree.delete(appGitKeepPath);
  }
}
