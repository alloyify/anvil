import { GeneratorBaseOptions, TransformedNames } from '@alloyify/devkit';

export interface PackageGeneratorOptions extends GeneratorBaseOptions {
  name: string;
  workspace?: string;
  scope?: string;
  packageNpmName?: string;
  nameT?: TransformedNames;
  workspaceT?: TransformedNames;
  scopeT?: TransformedNames;
}
