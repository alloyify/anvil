import { PackageRegistry } from '@alloyify/devkit';
import { GenerateTurborepoPackageOptions } from './generate-turborepo-package-options.interface';

export interface GenerateTurborepoOptions extends GenerateTurborepoPackageOptions {
  registry?: PackageRegistry;
  repository?: string;
}
