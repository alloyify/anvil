import { GeneratorBaseOptions, TransformedNames } from '@alloyify/devkit';

export interface ApplicationGeneratorOptions extends GeneratorBaseOptions {
  name: string;
  directory?: string;
}

export interface ApplicationGeneratorOptionsTransformed {
  nameT: TransformedNames;
  directoryT: TransformedNames;
}
