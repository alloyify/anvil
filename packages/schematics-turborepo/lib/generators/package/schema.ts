import { TransformedNames } from '@alloyify/devkit';

export interface PackageGeneratorOptions {
  name: string;
  workspace?: string;
  scope?: string;
  nameTransformed?: TransformedNames;
}
