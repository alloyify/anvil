import { CwdConfigs, GeneratorsRunner, GeneratorsRunnerType } from '@alloyify/devkit';
import { packageGenerator, PackageGeneratorOptions } from '@alloyify/schematics-turborepo';
import { Command } from 'commander';
import * as inquirer from 'inquirer';
import { isEmpty, isNil } from 'lodash';
import { GENERATE_COMMAND, TurborepoSchematics, TURBOREPO_SCHEMATICS_LIST } from '../../constants';
import { logger } from '../../utils';
import { GenerateTurborepoPackageOptions } from './interfaces';

export class GenerateTurborepoCommand {
  static load(program: Command, cwdConfigs: CwdConfigs): void {
    program
      .command(GENERATE_COMMAND)
      .alias('g')
      .argument('<schematic>', `Schematic name. One of: ${TURBOREPO_SCHEMATICS_LIST}.`)
      .argument('[name]', 'Package name.')
      .option('-w, --workspace <workspace>', 'Workspace, e.g. "packages".', '')
      .option('-s, --scope <scope>', 'Package scope', '')
      .option('--cwd <cwd>', 'Working directory.')
      .option('--dry-run', 'Dry run.')
      .action(async (schematic: TurborepoSchematics, name?: string, options?: GenerateTurborepoPackageOptions) => {
        this.validateSchematic(schematic);

        name = await this.promptName(name);
        options.cwd = options.cwd ?? process.cwd();

        const runner = new GeneratorsRunner({
          cwd: options.cwd,
          dryRun: options.dryRun,
          runnerType: GeneratorsRunnerType.ANVIL,
        });

        switch (schematic) {
          case TurborepoSchematics.package:
            await runner.execute<PackageGeneratorOptions>(packageGenerator, {
              name,
              cwdConfigs,
              ...options,
            });
            break;

          default:
            break;
        }
      });
  }

  private static validateSchematic(schematic: TurborepoSchematics): void {
    if (!TurborepoSchematics[schematic]) {
      logger.error(`invalid schematic name, expected one of: ${TURBOREPO_SCHEMATICS_LIST}`);
      process.exit(1);
    }
  }

  private static async promptName(name: string): Promise<string> {
    if (name) {
      return name;
    }

    const prompt = inquirer.createPromptModule();

    return prompt({
      type: 'input',
      name: 'name',
      message: 'Please type a package name',
      validate: (val) => !isEmpty(val) && !isNil(val),
    }).then((answers) => answers.name);
  }
}
