import { GeneratorsRunner } from '@alloyify/devkit';
import { packageGenerator } from '@alloyify/schematics-turborepo';
import { Command } from 'commander';
import { GENERATE_COMMAND, TURBOREPO_SCHEMATICS, TURBOREPO_SCHEMATICS_LIST } from '../../constants';
import { logger } from '../../utils';

export class GenerateTurborepoCommand {
  static load(program: Command): void {
    program
      .command(GENERATE_COMMAND)
      .alias('g')
      .argument('<schematic>', `Schematic name. One of: ${TURBOREPO_SCHEMATICS_LIST}`)
      .argument('[packageName]', 'Package name.')
      .option('-w, --workspace <workspace>', 'Workspace, e.g. "packages"')
      .action(async (schematic: string, packageName?: string, options?: any) => {
        this.validateSchematic(schematic);
        const runner = new GeneratorsRunner(process.cwd());
        await runner.execute(packageGenerator, {
          packageName,
          ...options,
        });
      });
  }

  private static validateSchematic(schematic: string): void {
    if (!TURBOREPO_SCHEMATICS[schematic]) {
      logger.error(GENERATE_COMMAND, `Invalid schematic name, expected one of: ${TURBOREPO_SCHEMATICS_LIST}`);
      process.exit(1);
    }
  }
}
