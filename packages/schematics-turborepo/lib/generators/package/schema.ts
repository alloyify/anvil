import { GeneratorBaseOptions, PackageAccess, TransformedNames } from '@alloyify/devkit';

export interface PackageGeneratorOptions extends GeneratorBaseOptions {
  packageName: string;
  workspace?: string;
  scope?: string;
  access?: PackageAccess;
  license?: string;
  authorName?: string;
  authorEmail?: string;
  repository?: string;
}

export interface PackageGeneratorOptionsTransformed {
  packageNameT: TransformedNames;
  packageNameFull: string;
  scopeT: TransformedNames;
}
