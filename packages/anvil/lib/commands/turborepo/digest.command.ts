import { AnvilConfig, CwdConfigs, DotAnvilConfig } from '@alloyify/devkit';
import { isArrayFull, isStringFull } from '@alloyify/anvil-utils';
import { execSync } from 'child_process';
import { Command } from 'commander';
import { existsSync } from 'fs';
import { join } from 'path';
import { copy } from 'cpx';
import symlinkDir = require('symlink-dir');
import { TURBOREPO_DIGEST_COMMAND } from '../../constants';
import { logger } from '../../utils';
import { RunTurborepoDigestOptions } from './interfaces';

export class RunTurborepoDigestCommand {
  static load(program: Command, cwdConfigs: CwdConfigs): void {
    program
      .command(TURBOREPO_DIGEST_COMMAND.name)
      .alias(TURBOREPO_DIGEST_COMMAND.alias)
      .argument('[packageNames]', 'Package names')
      .option('-i, --install', 'Install packages', false)
      .option('-c, --copy', 'Copy packages', false)
      .action(async (packageNames: string, options: RunTurborepoDigestOptions) => {
        logger.info('running Turborepo digest');

        const { anvilConfig, dotAnvilConfig, workspacesList } = cwdConfigs;
        const names = this.getPackageNames(packageNames);

        if (isArrayFull(dotAnvilConfig?.digest?.targets) && isArrayFull(dotAnvilConfig?.digest?.packages)) {
          const scope = anvilConfig?.generators?.package?.scope;
          const toInstall: Record<string, { path: string; cmd: string }> = {};
          let toRemoveCmd = '';

          dotAnvilConfig.digest.packages.forEach((pkg) => {
            pkg.targets.forEach(async (targetName) => {
              if (this.runForPackage(names, pkg.name)) {
                if (options.install) {
                  const fullPackageName = `${scope ? `@${scope}/${pkg.name}` : pkg.name}@latest`;
                  const packageTragetPath = this.getTargetPath(targetName, pkg.name, dotAnvilConfig, anvilConfig);

                  if (packageTragetPath) {
                    toRemoveCmd = !toRemoveCmd
                      ? `npx rimraf ${packageTragetPath}`
                      : `${toRemoveCmd} ${packageTragetPath}`;
                  }

                  if (!toInstall[targetName]) {
                    toInstall[targetName] = {
                      path: dotAnvilConfig.digest.targets.find((one) => one.name === targetName)?.path,
                      cmd: `pnpm -w add ${fullPackageName}`,
                    };
                  } else {
                    toInstall[targetName].cmd += ` ${fullPackageName}`;
                  }
                } else if (options.copy) {
                  this.copyPackage(targetName, pkg.name, dotAnvilConfig, anvilConfig, workspacesList);
                } else {
                  await this.createPackageSymlink(targetName, pkg.name, dotAnvilConfig, anvilConfig, workspacesList);
                }
              }
            });
          });

          if (toRemoveCmd) {
            execSync(toRemoveCmd, {
              cwd: process.cwd(),
              stdio: 'inherit',
            });
          }

          Object.keys(toInstall).forEach((targetName: string) => {
            const { path, cmd } = toInstall[targetName];

            execSync(cmd, {
              cwd: path,
              stdio: 'inherit',
            });
          });
        }
      });
  }

  private static getPackageNames(packageNames: string): string[] {
    return isStringFull(packageNames) ? packageNames.split(',') : [];
  }

  private static runForPackage(packageNames: string[], packageName: string): boolean {
    if (isArrayFull(packageNames)) {
      return !!packageNames.find((o) => o === packageName);
    }

    return true;
  }

  private static copyPackage(
    targetName: string,
    packageName: string,
    dotAnvilConfig: DotAnvilConfig,
    anvilConfig: AnvilConfig,
    workspacesList: string[],
  ) {
    const packagePath = this.getPackagePath(packageName, workspacesList);
    const packageTragetPath = this.getTargetPath(targetName, packageName, dotAnvilConfig, anvilConfig);

    if (packageTragetPath) {
      execSync(`npx rimraf ${packageTragetPath}`, {
        cwd: process.cwd(),
        stdio: 'inherit',
      });
    }

    copy(join(packagePath, 'dist/**/*'), join(packageTragetPath, 'dist'));
    copy(join(packagePath, 'package.json'), packageTragetPath);
  }

  private static async createPackageSymlink(
    targetName: string,
    packageName: string,
    dotAnvilConfig: DotAnvilConfig,
    anvilConfig: AnvilConfig,
    workspacesList: string[],
  ) {
    const tragetPath = this.getTargetPath(targetName, packageName, dotAnvilConfig, anvilConfig);
    const packagePath = this.getPackagePath(packageName, workspacesList);

    if (tragetPath && packagePath) {
      await symlinkDir(packagePath, tragetPath);
    }
  }

  private static getTargetPath(
    targetName: string,
    packageName: string,
    dotAnvilConfig: DotAnvilConfig,
    anvilConfig: AnvilConfig,
  ): string {
    const target = dotAnvilConfig.digest.targets.find((one) => one.name === targetName);
    const scope = anvilConfig?.generators?.package?.scope;

    return target ? join(target.path, 'node_modules', scope ? `@${scope}` : '', packageName) : null;
  }

  private static getPackagePath(packageName: string, workspacesList: string[]): string {
    for (let i = 0; i < workspacesList.length; i++) {
      const workspaceName = workspacesList[0];
      const path = join(process.cwd(), workspaceName, packageName);

      if (existsSync(path)) {
        return path;
      }
    }

    return null;
  }
}
