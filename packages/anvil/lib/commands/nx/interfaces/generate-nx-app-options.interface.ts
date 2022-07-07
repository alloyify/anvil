import { GeneratorCommonOptions } from '@alloyify/devkit';
import { ApplicationType } from '@alloyify/schematics-nx';

export interface GenerateNxAppOptions extends GeneratorCommonOptions {
  directory?: string;
  type: ApplicationType;
}
