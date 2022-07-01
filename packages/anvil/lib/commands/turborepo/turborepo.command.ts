import {
  GeneratorsRunner,
  GeneratorsRunnerType,
  PACKAGE_ACCESS_CHOICES,
  PACKAGE_ACCESS_DEFAULT,
  PACKAGE_REGISTRY_CHOICES,
  PACKAGE_REGISTRY_DEFAULT,
  PNPM_WORKSPACE_DEFAULT,
} from '@alloyify/devkit';
import { turborepoGenerator, TurborepoGeneratorOptions } from '@alloyify/schematics-turborepo';
import { Command } from 'commander';
import { existsSync } from 'fs';
import deepMerge from 'ts-deepmerge';
import * as inquirer from 'inquirer';
import { isEmpty, isNil } from 'lodash';
import { join } from 'path';
import { TURBOREPO_COMMAND } from '../../constants';
import { getCommandCommonOptions, logger, runPrompts } from '../../utils';
import { GenerateTurborepoOptions } from './interfaces';

export class GenerateTurborepoCommand {
  static load(program: Command): void {
    const command = program
      .command(TURBOREPO_COMMAND.name)
      .alias(TURBOREPO_COMMAND.alias)
      .argument('[name]', 'Monorepo name')
      .option('-w, --workspace <workspace>', 'Packages workspace name')
      .option('-s, --scope <scope>', 'Packages scope')
      .option('-r, --registry <registry>', `Packages registry. One of: ${PACKAGE_REGISTRY_CHOICES}`)
      .option('-rep, --repository <repository>', 'Monorepo repository URL')
      .option('-a, --access <access>', `Packages access. One of: ${PACKAGE_ACCESS_CHOICES}`)
      .option('-l, --license <license>', 'Packages license')
      .option('-an, --authorName <authorName>', 'Packages author`s name')
      .option('-ae, --authorEmail <authorEmail>', 'Packages author`s email')
      .action(async (name: string, options: GenerateTurborepoOptions) => {
        logger.info('running Turborepo generator');

        const promptOptions = await this.promptOptions(name, options);

        const runner = new GeneratorsRunner({
          cwd: options.cwd,
          dryRun: options.dryRun,
          runnerType: GeneratorsRunnerType.ANVIL,
        });

        await runner.execute<TurborepoGeneratorOptions>(turborepoGenerator, {
          ...promptOptions,
        });
      });

    getCommandCommonOptions(command);
  }

  private static async promptOptions(
    name: string,
    options: GenerateTurborepoOptions,
  ): Promise<TurborepoGeneratorOptions> {
    logger.debug('promptOptions');

    const defaultOptions: Partial<TurborepoGeneratorOptions> = {
      name: name ?? '',
      workspace: PNPM_WORKSPACE_DEFAULT,
      scope: '',
      repository: '',
      registry: PACKAGE_REGISTRY_DEFAULT,
      access: PACKAGE_ACCESS_DEFAULT,
      license: '',
      authorName: '',
      authorEmail: '',
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
      if (options.workspace !== defaultOptions.workspace) {
        questions.push({
          type: 'input',
          name: 'workspace',
          message: 'Please type the packages workspace',
          default: defaultOptions.workspace,
          validate: (val) => !isEmpty(val) && !isNil(val),
        });
      }

      if (isNil(options.scope)) {
        questions.push({
          type: 'input',
          name: 'scope',
          message: 'Please type the packages scope, if needed',
          default: defaultOptions.scope,
        });
      }

      if (options.registry !== defaultOptions.registry) {
        questions.push({
          type: 'list',
          name: 'registry',
          message: 'Please select the packages registry',
          choices: PACKAGE_REGISTRY_CHOICES.map((a) => ({
            name: a,
            checked: a === defaultOptions.registry,
          })),
        } as inquirer.ListQuestion);
      }

      if (isNil(options.repository)) {
        questions.push({
          type: 'input',
          name: 'repository',
          message: 'Please type the monorepo repository URL',
          default: defaultOptions.repository,
        });
      }

      if (options.access !== defaultOptions.access) {
        questions.push({
          type: 'list',
          name: 'access',
          message: 'Please select the packages access',
          choices: PACKAGE_ACCESS_CHOICES.map((a) => ({
            name: a,
            checked: a === defaultOptions.access,
          })),
        } as inquirer.ListQuestion);
      }

      if (isNil(options.license)) {
        questions.push({
          type: 'input',
          name: 'license',
          message: 'Please type the packages license, if needed',
          default: defaultOptions.license,
        });
      }

      if (isNil(options.authorName)) {
        questions.push({
          type: 'input',
          name: 'authorName',
          message: 'Please type the packages author`s name',
          default: defaultOptions.authorName,
        });
      }

      if (isNil(options.authorEmail)) {
        questions.push({
          type: 'input',
          name: 'authorEmail',
          message: 'Please type the packages author`s email',
          default: defaultOptions.authorEmail,
        });
      }
    } else if (isEmpty(options.workspace) || isNil(options.workspace)) {
      options.workspace = defaultOptions.workspace;
    }

    const answers = await runPrompts<TurborepoGeneratorOptions>(questions);

    return deepMerge(defaultOptions, options, answers);
  }
}
