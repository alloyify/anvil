import { TransformedNames } from '@alloyify/devkit';

export interface PackageGeneratorOptions {
  name: string;
  workspace?: string;
  scope?: string;
  cwd?: string;
  nameT?: TransformedNames;
  workspaceT?: TransformedNames;
  scopeT?: TransformedNames;
}
