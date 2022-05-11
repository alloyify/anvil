import { AnvilConfigGeneratorsPackage, GeneratorCommonOptions } from '@alloyify/devkit';

export interface GenerateTurborepoPackageOptions extends GeneratorCommonOptions {
  workspace?: string;
  scope?: string;
  access?: AnvilConfigGeneratorsPackage['access'];
  license?: string;
  authorName?: string;
  authorEmail?: string;
}
