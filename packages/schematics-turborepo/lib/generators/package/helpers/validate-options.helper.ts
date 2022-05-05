import { loadTurboJson, Logger } from '@alloyify/devkit';
import { PackageGeneratorOptions } from '../schema';

export function validateOptions(options: PackageGeneratorOptions, logger: Logger): void {
  options.cwd = options.cwd ?? process.cwd();

  const turboJson = loadTurboJson(options.cwd, logger);

  if (!turboJson) {
    logger.error('Current working directory is not a Turborepo');
    process.exit(1);
  }

  // console.log(resolveWorkspace('asdasd', options.cwd));
}
