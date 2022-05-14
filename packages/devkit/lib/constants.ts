export const ANVIL_CONFIG = 'anvil';
export const NX_JSON = 'nx';
export const TURBO_JSON = 'turbo';
export const PACKAGE_JSON = 'package';
export const WORKSPACE_JSON = 'workspace';
export const PNPM_WORKSPACE_YAML = 'pnpm-workspace';
export const PNPM_WORKSPACE_DEFAULT = 'packages';
export const PNPM_PACKAGES_FIELD = 'packages';

export enum CwdType {
  EMPTY = 'empty',
  NX = 'nx',
  TURBOREPO = 'turborepo',
  NOT_MONOREPO = 'not-monorepo',
}

export enum GeneratorsRunnerType {
  ANVIL = 'anvil',
  ALLOYIFY = 'alloyify',
}

export enum PackageAccess {
  RESTRICTED = 'restricted',
  PUBLIC = 'public',
}

export enum PackageRegistry {
  NPM = 'npm',
  GITHUB = 'github',
}

export const PACKAGE_ACCESS_DEFAULT = PackageAccess.RESTRICTED;
export const PACKAGE_ACCESS_CHOICES = Object.values(PackageAccess);
export const PACKAGE_LICENSE_DEFAULT = 'LICENSE';
export const PACKAGE_REGISTRY_DEFAULT = PackageRegistry.NPM;
export const PACKAGE_REGISTRY_CHOICES = Object.values(PackageRegistry);
