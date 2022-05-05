import { GeneratorsRunnerType } from '../constants';

export interface GeneratorsRunnerOptions {
  cwd: string;
  runnerType: GeneratorsRunnerType;
  printChanges?: boolean;
  dryRun?: boolean;
}
