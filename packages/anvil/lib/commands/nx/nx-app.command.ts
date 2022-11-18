import { GeneratorsRunner, GeneratorsRunnerType } from '@alloyify/devkit';
import {
  applicationGenerator,
  ApplicationGeneratorOptions,
  APPLICATION_TYPE_CHOICES,
  ApplicationType,
} from '@alloyify/schematics-nx';
import { isIn } from '@alloyify/anvil-utils';
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
      .option('-t, --type <type>', `Application type. One of: ${APPLICATION_TYPE_CHOICES}`)
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
      type: ApplicationType.MICROSERVICE,
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

    if (!options.yes) {
      if (!isIn(options.type, APPLICATION_TYPE_CHOICES)) {
        questions.push({
          type: 'list',
          name: 'type',
          message: 'Please select the application type',
          choices: APPLICATION_TYPE_CHOICES.map((a) => ({
            name: a,
            checked: a === defaultOptions.type,
          })),
        } as inquirer.ListQuestion);
      }
    }

    const answers = await runPrompts<ApplicationGeneratorOptions>(questions);

    return deepMerge(defaultOptions, options, answers);
  }
}
