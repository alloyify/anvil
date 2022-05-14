import { GeneratorCommonOptions, PackageAccess, PackageRegistry } from '@alloyify/devkit';

export interface GenerateTurborepoPackageOptions extends GeneratorCommonOptions {
  workspace?: string;
  scope?: string;
  access?: PackageAccess;
  registry?: PackageRegistry;
  license?: string;
  authorName?: string;
  authorEmail?: string;
}
