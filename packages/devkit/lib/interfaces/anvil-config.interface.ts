import { PackageAccess, PackageRegistry } from '../constants';

export interface AnvilConfig {
  generators?: AnvilConfigGenerators;
}

export interface AnvilConfigGenerators {
  package?: AnvilConfigGeneratorsPackage;
}

export interface AnvilConfigGeneratorsPackage {
  scope?: string;
  access?: PackageAccess;
  registry?: PackageRegistry;
  license?: string;
  author?: {
    name?: string;
    email?: string;
  };
}
