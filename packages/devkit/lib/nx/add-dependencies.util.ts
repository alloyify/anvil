import { addDependenciesToPackageJson, Tree, readJson } from '@nrwl/devkit';
import { inspect } from 'util';
import { NpmDependency } from '../interfaces';
import { Logger } from '../logger';

export function addDependencies(
  tree: Tree,
  dependencies: NpmDependency[],
  devDependencies: NpmDependency[],
  logger: Logger,
) {
  const packageJson = readJson(tree, 'package.json');
  const deps = {};
  const devDeps = {};

  dependencies.forEach((dependency) => {
    if (!packageJson.dependencies[dependency.name]) {
      deps[dependency.name] = dependency.version;
    }
  });

  devDependencies.forEach((dependency) => {
    if (!packageJson.devDependencies[dependency.name]) {
      devDeps[dependency.name] = dependency.version;
    }
  });

  addDependenciesToPackageJson(tree, deps, devDeps);

  logger.debug('Added dependencies to package.json:');
  logger.debug(inspect(deps, true, null));
  logger.debug('Added devDependencies to package.json:');
  logger.debug(inspect(devDeps, true, null));
}
