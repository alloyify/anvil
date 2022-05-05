import { GeneratorsRunnerType } from '../constants';

export interface GeneratorsRunnerOptions {
  cwd: string;
  type: GeneratorsRunnerType;
  printChanges?: boolean;
  dryRun?: boolean;
}
