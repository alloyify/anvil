import { GeneratorBaseOptions, PackageAccess, PackageRegistry, TransformedNames } from '@alloyify/devkit';

export interface TurborepoGeneratorOptions extends GeneratorBaseOptions {
  name: string;
  workspace?: string;
  scope?: string;
  registry?: PackageRegistry;
  repository?: string;
  access?: PackageAccess;
  license?: string;
  authorName?: string;
  authorEmail?: string;
}

export interface TurborepoGeneratorOptionsTransformed {
  nameT: TransformedNames;
  workspaceT: TransformedNames;
  scopeT: TransformedNames;
  registryUrl: string;
}

export interface TurborepoGeneratorOptionsCalculated {
  npmRegistryUrlLine: string;
  npmTokenLine: string;
  npmTokenCiEnvName: string;
}
