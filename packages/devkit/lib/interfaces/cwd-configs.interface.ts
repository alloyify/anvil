import { CwdType } from '../constants';
import { AnvilConfig } from './anvil-config.interface';

export interface CwdConfigs {
  cwdType: CwdType;
  anvilConfig?: AnvilConfig;
  packageJson?: Record<string, any>;
  nxJson?: Record<string, any>;
  nxWorkspaceJson?: Record<string, any>;
  turboJson?: Record<string, any>;
  pnpmWorkspaceYaml?: { packages: string[] };
  workspacesList?: string[];
}
