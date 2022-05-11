import { GeneratorsRunnerType } from '../constants';

export interface GeneratorsRunnerOptions {
  cwd: string;
  dryRun?: boolean;
  runnerType: GeneratorsRunnerType;
  printChanges?: boolean;
}
