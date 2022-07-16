import { AnvilConfig, CwdConfigs, DotAnvilConfig } from '@alloyify/devkit';
import { isArrayFull } from '@alloyify/utils';
import { execSync } from 'child_process';
import { Command } from 'commander';
import { existsSync } from 'fs';
import { join } from 'path';
import symlinkDir = require('symlink-dir');
import { TURBOREPO_DIGEST_COMMAND } from '../../constants';
import { logger } from '../../utils';
import { RunTurborepoDigestOptions } from './interfaces';

export class RunTurborepoDigestCommand {
  static load(program: Command, cwdConfigs: CwdConfigs): void {
    program
      .command(TURBOREPO_DIGEST_COMMAND.name)
      .alias(TURBOREPO_DIGEST_COMMAND.alias)
      .option('-i, --install', 'Install packages', false)
      .action(async (options: RunTurborepoDigestOptions) => {
        logger.info('running Turborepo digest');

        const { anvilConfig, dotAnvilConfig, workspacesList } = cwdConfigs;

        if (isArrayFull(dotAnvilConfig.targets) && isArrayFull(dotAnvilConfig.packages)) {
          const toInstall: Record<string, { path: string; cmd: string }> = {};
          let toRemoveCmd = '';

          dotAnvilConfig.packages.forEach((pkg) => {
            pkg.targets.forEach(async (targetName) => {
              if (options.install) {
                const scope = anvilConfig?.generators?.package?.scope;
                const fullPackageName = `${scope ? `@${scope}/${pkg.name}` : pkg.name}@latest`;
                const packageTragetPath = this.getTargetPath(targetName, pkg.name, dotAnvilConfig, anvilConfig);

                if (packageTragetPath) {
                  toRemoveCmd = !toRemoveCmd
                    ? `npx rimraf ${packageTragetPath}`
                    : `${toRemoveCmd} ${packageTragetPath}`;
                }

                if (!toInstall[targetName]) {
                  toInstall[targetName] = {
                    path: dotAnvilConfig.targets.find((one) => one.name === targetName)?.path,
                    cmd: `pnpm -w add ${fullPackageName}`,
                  };
                } else {
                  toInstall[targetName].cmd += ` ${fullPackageName}`;
                }
              } else {
                await this.createPackageSymlink(targetName, pkg.name, dotAnvilConfig, anvilConfig, workspacesList);
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

  private static installPackages() {}

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
    const target = dotAnvilConfig.targets.find((one) => one.name === targetName);
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
