import {
  CwdConfigs,
  GeneratorsRunner,
  GeneratorsRunnerType,
  PACKAGE_ACCESS_CHOICES,
  PACKAGE_ACCESS_DEFAULT,
  resolvePackageAccess,
  resolveWorkspace,
} from '@alloyify/devkit';
import { packageGenerator, PackageGeneratorOptions } from '@alloyify/schematics-turborepo';
import { Command } from 'commander';
import deepMerge from 'ts-deepmerge';
import * as inquirer from 'inquirer';
import { isEmpty, isNil } from 'lodash';
import { TURBO_PACKAGE_COMMAND } from '../../constants';
import { getCommandCommonOptions, logger } from '../../utils';
import { GenerateTurborepoPackageOptions } from './interfaces';

export class GenerateTurborepoPackageCommand {
  static load(program: Command, cwdConfigs: CwdConfigs): void {
    const command = program
      .command(TURBO_PACKAGE_COMMAND.name)
      .alias(TURBO_PACKAGE_COMMAND.alias)
      .argument('[packageName]', 'Package name')
      .option('-w, --workspace <workspace>', `Workspace. One of: ${cwdConfigs.workspacesList}`)
      .option('-s, --scope <scope>', 'Package scope')
      .option('-a, --access <access>', `Package access. One of: ${PACKAGE_ACCESS_CHOICES}`)
      .option('-l, --license <license>', 'Package license')
      .option('-an, --authorName <authorName>', 'Package author`s name')
      .option('-ae, --authorEmail <authorEmail>', 'Package author`s email')
      .action(async (packageName: string, options: GenerateTurborepoPackageOptions) => {
        logger.info('running Turborepo package generator');

        const promptOptions = await this.promptOptions(packageName, options, cwdConfigs);

        const runner = new GeneratorsRunner({
          cwd: options.cwd,
          dryRun: options.dryRun,
          runnerType: GeneratorsRunnerType.ANVIL,
        });

        await runner.execute<PackageGeneratorOptions>(packageGenerator, {
          cwdConfigs,
          ...promptOptions,
        });
      });

    getCommandCommonOptions(command);
  }

  private static async promptOptions(
    packageName: string,
    options: GenerateTurborepoPackageOptions,
    cwdConfigs: CwdConfigs,
  ): Promise<PackageGeneratorOptions & { packageName: string }> {
    logger.debug('promptOptions');

    const fromAnvilConfig = cwdConfigs.anvilConfig.generators.package;
    const defaultOptions: Partial<PackageGeneratorOptions> = {
      packageName: packageName ?? '',
      workspace: resolveWorkspace(cwdConfigs.workspacesList, options.workspace, logger),
      scope: fromAnvilConfig.scope,
      access: resolvePackageAccess(fromAnvilConfig, options.access, logger),
      license: fromAnvilConfig.license,
      authorName: fromAnvilConfig.author.name,
      authorEmail: fromAnvilConfig.author.email,
    };
    const questions: inquirer.Question[] = [];
    let answers: any = {};

    if (!packageName) {
      questions.push({
        type: 'input',
        name: 'packageName',
        message: 'Please type a package name',
        validate: (val) => !isEmpty(val) && !isNil(val),
      });
    }

    if (!options.yes && cwdConfigs.workspacesList.length > 1 && options.workspace !== defaultOptions.workspace) {
      questions.push({
        type: 'list',
        name: 'workspace',
        message: 'Please select the workspace',
        choices: cwdConfigs.workspacesList.map((w, i) => ({
          name: w,
          checked: i === 0,
        })),
      } as inquirer.ListQuestion);
    }

    if (!options.yes && isNil(options.scope)) {
      questions.push({
        type: 'input',
        name: 'scope',
        message: 'Please type a package scope, if needed',
        default: defaultOptions.scope,
      });
    }

    if (!options.yes && options.access !== defaultOptions.access) {
      questions.push({
        type: 'list',
        name: 'access',
        message: 'Please select a package access',
        choices: PACKAGE_ACCESS_CHOICES.map((a) => ({
          name: a,
          checked: a === PACKAGE_ACCESS_DEFAULT,
        })),
      } as inquirer.ListQuestion);
    }

    if (!options.yes && isNil(options.license)) {
      questions.push({
        type: 'input',
        name: 'license',
        message: 'Please type a package license, if needed',
        default: defaultOptions.license,
      });
    }

    if (!options.yes && isNil(options.authorName)) {
      questions.push({
        type: 'input',
        name: 'authorName',
        message: 'Please type a package author`s name',
        default: defaultOptions.authorName,
      });
    }

    if (!options.yes && isNil(options.authorEmail)) {
      questions.push({
        type: 'input',
        name: 'authorEmail',
        message: 'Please type a package author`s email',
        default: defaultOptions.authorEmail,
      });
    }

    if (questions.length) {
      const prompt = inquirer.createPromptModule();
      answers = (await prompt(questions)
        .then((a) => a)
        .catch((e) => {
          logger.error('error while prompting options:');
          logger.error(e);
        })) as any;
    }

    return deepMerge(defaultOptions, options, answers);
  }
}
