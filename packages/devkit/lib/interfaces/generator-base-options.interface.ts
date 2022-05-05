import { CwdConfigs } from './cwd-configs.interface';
import { GeneratorsRunnerType } from '../constants';

export interface GeneratorBaseOptions {
  cwd?: string;
  cwdConfigs?: CwdConfigs;
  dryRun?: boolean;
  runnerType?: GeneratorsRunnerType;
}
