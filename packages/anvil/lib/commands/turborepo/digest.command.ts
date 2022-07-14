import { AnvilConfig, CwdConfigs, DotAnvilConfig } from '@alloyify/devkit';
import { isArrayFull } from '@alloyify/utils';
import { Command } from 'commander';
import { existsSync } from 'fs';
import { join } from 'path';
import symlinkDir = require('symlink-dir');
import { TURBOREPO_DIGEST_COMMAND } from '../../constants';
import { logger } from '../../utils';

export class RunTurborepoDigestCommand {
  static load(program: Command, cwdConfigs: CwdConfigs): void {
    program
      .command(TURBOREPO_DIGEST_COMMAND.name)
      .alias(TURBOREPO_DIGEST_COMMAND.alias)
      .action(async () => {
        logger.info('running Turborepo digest');

        const { anvilConfig, dotAnvilConfig, workspacesList } = cwdConfigs;

        if (isArrayFull(dotAnvilConfig.targets) && isArrayFull(dotAnvilConfig.packages)) {
          dotAnvilConfig.packages.forEach((pkg) => {
            if (isArrayFull(pkg?.targets)) {
              pkg.targets.forEach(async (targetName) => {
                const tragetPath = this.getTargetPath(targetName, pkg.name, dotAnvilConfig, anvilConfig);
                const packagePath = this.getPackagePath(pkg.name, workspacesList);

                if (tragetPath && packagePath) {
                  await symlinkDir(packagePath, tragetPath);
                }
              });
            }
          });
        }
      });
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
