import { GeneratorBaseOptions, TransformedNames } from '@alloyify/devkit';

export interface WorkspaceGeneratorOptions extends GeneratorBaseOptions {
  name: string;
  scope?: string;
}

export interface WorkspaceGeneratorOptionsTransformed {
  nameT: TransformedNames;
  scopeT: TransformedNames;
}
