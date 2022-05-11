import { AnvilConfigGeneratorsPackage, GeneratorBaseOptions, TransformedNames } from '@alloyify/devkit';

export interface PackageGeneratorOptions extends GeneratorBaseOptions {
  // these come from options
  packageName: string;
  workspace?: string;
  scope?: string;
  access?: AnvilConfigGeneratorsPackage['access'];
  license?: string;
  authorName?: string;
  authorEmail?: string;
}

export interface PackageGeneratorOptionsTransformed {
  packageNameT: TransformedNames;
  packageNameFull: string;
  scopeT: TransformedNames;
}
