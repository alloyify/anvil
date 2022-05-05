import { TransformedNames, GeneratorsRunnerType } from '@alloyify/devkit';

export interface PackageGeneratorOptions {
  name: string;
  workspace?: string;
  scope?: string;
  cwd?: string;
  dryRun?: boolean;
  type?: GeneratorsRunnerType;
  nameT?: TransformedNames;
  workspaceT?: TransformedNames;
  scopeT?: TransformedNames;
}
