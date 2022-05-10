import { AnvilConfig } from './anvil-config.interface';

export type CwdType = 'turborepo' | 'nx' | 'empty' | 'not-monorepo';

export interface CwdConfigs {
  cwdType: CwdType;
  anvilConfig?: AnvilConfig;
  packageJson?: Record<string, any>;
  nxJson?: Record<string, any>;
  nxWorkspaceJson?: Record<string, any>;
  turboJson?: Record<string, any>;
  pnpmWorkspaceYaml?: { packages: string[] };
}
