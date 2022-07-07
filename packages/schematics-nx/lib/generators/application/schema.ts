import { GeneratorBaseOptions, TransformedNames } from '@alloyify/devkit';
import { ApplicationType } from './constants';

export interface ApplicationGeneratorOptions extends GeneratorBaseOptions {
  name: string;
  type: ApplicationType;
  directory?: string;
}

export interface ApplicationGeneratorOptionsTransformed {
  nameT: TransformedNames;
  directoryT: TransformedNames;
  directoryName: string;
}
