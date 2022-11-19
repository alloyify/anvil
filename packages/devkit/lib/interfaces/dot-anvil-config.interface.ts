import { PackageAccess, PackageRegistry } from '../constants';

export enum DotAnvilConfigTargetType {
  NX = 'nx',
  TURBOREPO = 'turborepo',
}

export interface DotAnvilConfigTarget {
  name: string;
  path: string;
  type: DotAnvilConfigTargetType;
}

export interface DotAnvilConfigMonorepoPackage {
  name: string;
  targets: string[];
}

export interface DotAnvilConfigGeneratorsPackage {
  scope?: string;
  access?: PackageAccess;
  registry?: PackageRegistry;
  license?: string;
  author?: {
    name?: string;
    email?: string;
  };
}

export interface DotAnvilConfigGenerators {
  package?: DotAnvilConfigGeneratorsPackage;
}

export interface DotAnvilConfig {
  generators?: DotAnvilConfigGenerators;
  digest?: {
    packages: DotAnvilConfigMonorepoPackage[];
    targets: DotAnvilConfigTarget[];
  };
}
