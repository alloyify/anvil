import { names } from '@alloyify/devkit';
import { PackageGeneratorOptions } from '../schema';

export function transformOptions(options: PackageGeneratorOptions) {
  options.nameT = names(options.name);
  options.scopeT = names(options.scope);
  options.workspaceT = names(options.workspace);
}
