import { CwdConfigs } from './cwd-configs.interface';
import { GeneratorsRunnerType } from '../constants';

export interface GeneratorCommonOptions {
  cwd?: string;
  dryRun?: boolean;
  yes?: boolean;
}

export interface GeneratorBaseOptions extends GeneratorCommonOptions {
  cwdConfigs?: CwdConfigs;
  runnerType?: GeneratorsRunnerType;
}
