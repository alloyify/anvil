import { loadTurboJson, resolveWorkspace } from '@alloyify/devkit';
import { PackageGeneratorOptions } from '../schema';

export function validateOptions(options: PackageGeneratorOptions): void {
  options.cwd = options.cwd ?? process.cwd();

  const turboJson = loadTurboJson(options.cwd);

  if (!turboJson) {
    // logger.error(LOG_PREFIX, `Current working directory is not a Turborepo`);
    process.exit(1);
  }

  console.log(resolveWorkspace('asdasd', options.cwd));
}
