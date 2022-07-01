import { GeneratorsRunner, GeneratorsRunnerType } from '@alloyify/devkit';
import { workspaceGenerator, WorkspaceGeneratorOptions } from '@alloyify/schematics-nx';
import { Command } from 'commander';
import { existsSync } from 'fs';
import deepMerge from 'ts-deepmerge';
import * as inquirer from 'inquirer';
import { isEmpty, isNil } from 'lodash';
import { join } from 'path';
import { NX_WORKSPACE_COMMAND } from '../../constants';
import { getCommandCommonOptions, logger, runPrompts } from '../../utils';
import { GenerateNxWorkspaceOptions } from './interfaces';

export class GenerateNxWorkspaceCommand {
  static load(program: Command): void {
    const command = program
      .command(NX_WORKSPACE_COMMAND.name)
      .alias(NX_WORKSPACE_COMMAND.alias)
      .argument('[name]', 'Monorepo name')
      .option('-s, --scope <scope>', 'NPM scope')
      .action(async (name: string, options: GenerateNxWorkspaceOptions) => {
        logger.info('running Nx workspace generator');

        const promptOptions = await this.promptOptions(name, options);

        const runner = new GeneratorsRunner({
          cwd: options.cwd,
          dryRun: options.dryRun,
          runnerType: GeneratorsRunnerType.ANVIL,
        });

        await runner.execute<WorkspaceGeneratorOptions>(workspaceGenerator, {
          ...promptOptions,
        });
      });

    getCommandCommonOptions(command);
  }

  private static async promptOptions(
    name: string,
    options: GenerateNxWorkspaceOptions,
  ): Promise<WorkspaceGeneratorOptions> {
    logger.debug('promptOptions');

    const defaultOptions: Partial<WorkspaceGeneratorOptions> = {
      name: name ?? '',
      scope: '',
    };

    const questions: inquirer.Question[] = [];
    const folderExists = (v: string) => existsSync(join(options.cwd, v));

    if (!name || folderExists(name)) {
      questions.push({
        type: 'input',
        name: 'name',
        message: 'Please type the monorepo name',
        validate: (val) => !isEmpty(val) && !isNil(val) && !folderExists(val),
      });
    }

    if (!options.yes) {
      if (isNil(options.scope)) {
        questions.push({
          type: 'input',
          name: 'scope',
          message: 'Please type the NPM scope, if needed',
          default: defaultOptions.scope,
        });
      }
    }

    const answers = await runPrompts<WorkspaceGeneratorOptions>(questions);

    return deepMerge(defaultOptions, options, answers);
  }
}
