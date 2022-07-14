import { CwdType } from '../constants';
import { AnvilConfig } from './anvil-config.interface';
import { DotAnvilConfig } from './dot-anvil-config.interface';

export interface CwdConfigs {
  cwdType: CwdType;
  anvilConfig?: AnvilConfig;
  dotAnvilConfig?: DotAnvilConfig;
  packageJson?: Record<string, any>;
  nxJson?: Record<string, any>;
  nxWorkspaceJson?: Record<string, any>;
  turboJson?: Record<string, any>;
  pnpmWorkspaceYaml?: { packages: string[] };
  workspacesList?: string[];
}
