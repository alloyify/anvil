import { GeneratorsRunner, GeneratorsRunnerType } from '@alloyify/devkit';
import { applicationGenerator, ApplicationGeneratorOptions } from '@alloyify/schematics-nx';
import { Command } from 'commander';
import deepMerge from 'ts-deepmerge';
import * as inquirer from 'inquirer';
import { isEmpty, isNil } from 'lodash';
import { NX_APP_COMMAND } from '../../constants';
import { getCommandCommonOptions, logger, runPrompts } from '../../utils';
import { GenerateNxAppOptions } from './interfaces';

export class GenerateNxAppCommand {
  static load(program: Command): void {
    const command = program
      .command(NX_APP_COMMAND.name)
      .alias(NX_APP_COMMAND.alias)
      .argument('[name]', 'Application name')
      .option('-dir, --directory <directory>', 'App directory')
      .action(async (name: string, options: GenerateNxAppOptions) => {
        logger.info('running Nx app generator');

        const promptOptions = await this.promptOptions(name, options);

        const runner = new GeneratorsRunner({
          cwd: options.cwd,
          dryRun: options.dryRun,
          runnerType: GeneratorsRunnerType.ANVIL,
        });

        await runner.execute<ApplicationGeneratorOptions>(applicationGenerator, {
          ...promptOptions,
        });
      });

    getCommandCommonOptions(command);
  }

  private static async promptOptions(
    name: string,
    options: GenerateNxAppOptions,
  ): Promise<ApplicationGeneratorOptions> {
    logger.debug('promptOptions');

    const defaultOptions: Partial<ApplicationGeneratorOptions> = {
      name: name ?? '',
      directory: '',
    };

    const questions: inquirer.Question[] = [];

    if (!name) {
      questions.push({
        type: 'input',
        name: 'name',
        message: 'Please type the application name',
        validate: (val) => !isEmpty(val) && !isNil(val),
      });
    }

    const answers = await runPrompts<ApplicationGeneratorOptions>(questions);

    return deepMerge(defaultOptions, options, answers);
  }
}
