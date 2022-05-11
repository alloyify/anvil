export const ANVIL_CONFIG = 'anvil';
export const NX_JSON = 'nx';
export const TURBO_JSON = 'turbo';
export const PACKAGE_JSON = 'package';
export const WORKSPACE_JSON = 'workspace';
export const PNPM_WORKSPACE_YAML = 'pnpm-workspace';
export const PNPM_WORKSPACE_DEFAULT = 'packages';
export const PNPM_PACKAGES_FIELD = 'packages';

export enum GeneratorsRunnerType {
  ANVIL = 'anvil',
  ALLOYIFY = 'alloyify',
}

export enum PackageAccess {
  RESTRICTED = 'restricted',
  PUBLIC = 'public',
}

export const PACKAGE_ACCESS_DEFAULT = PackageAccess.RESTRICTED;
export const PACKAGE_ACCESS_CHOICES = Object.values(PackageAccess);
