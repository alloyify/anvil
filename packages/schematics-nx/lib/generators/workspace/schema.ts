import { GeneratorBaseOptions, TransformedNames } from '@alloyify/devkit';

export interface WorkspaceGeneratorOptions extends GeneratorBaseOptions {
  name: string;
}

export interface WorkspaceGeneratorOptionsTransformed {
  nameT: TransformedNames;
}
