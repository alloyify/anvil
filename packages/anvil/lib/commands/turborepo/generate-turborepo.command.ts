import { GeneratorsRunner, logger } from '@alloyify/devkit';
import { packageGenerator, PackageGeneratorOptions } from '@alloyify/schematics-turborepo';
import { Command } from 'commander';
import * as inquirer from 'inquirer';
import { isEmpty, isNil } from 'lodash';
import { GENERATE_COMMAND, TurborepoSchematics, TURBOREPO_SCHEMATICS_LIST } from '../../constants';
import { GenerateTurborepoPackageOptions } from './interfaces';

export class GenerateTurborepoCommand {
  static load(program: Command): void {
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
        logger.info(GENERATE_COMMAND, `"${schematic}"`);

        name = await this.validateName(name);
        options.scope = await this.validateScope(options.scope);
        options.cwd = this.setCwd(options.cwd);

        const runner = new GeneratorsRunner(options.cwd);

        switch (schematic) {
          case TurborepoSchematics.package:
            await runner.execute<PackageGeneratorOptions>(
              packageGenerator,
              {
                name,
                ...options,
              },
              options.dryRun,
            );
            break;

          default:
            break;
        }
      });
  }

  private static validateSchematic(schematic: TurborepoSchematics): void {
    if (!TurborepoSchematics[schematic]) {
      logger.error(GENERATE_COMMAND, `Invalid schematic name, expected one of: ${TURBOREPO_SCHEMATICS_LIST}`);
      process.exit(1);
    }
  }

  private static setCwd(cwd: string): string {
    return cwd ?? process.cwd();
  }

  private static async validateName(name: string): Promise<string> {
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

  private static async validateScope(scope: string): Promise<string> {
    if (scope) {
      return scope;
    }

    const prompt = inquirer.createPromptModule();

    return prompt({
      type: 'input',
      name: 'scope',
      message: 'Please type a package scope',
    }).then((answers) => answers.scope);
  }
}
