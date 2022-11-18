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

export interface DotAnvilConfig {
  digest: {
    packages: DotAnvilConfigMonorepoPackage[];
    targets: DotAnvilConfigTarget[];
  };
}
