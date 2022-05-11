import { Command } from 'commander';

export function getCommandCommonOptions(program: Command): void {
  program
    .option('--cwd <cwd>', 'Working directory.', process.cwd())
    .option('-dr --dry-run', 'Do not apply any changes', false)
    .option('-y, --yes', 'Skip prompts and use default options.', false);
}
