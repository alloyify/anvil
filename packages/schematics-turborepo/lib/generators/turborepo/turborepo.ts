import { convertNxGenerator, getLogger, join, Tree } from '@alloyify/devkit';
import { execSync } from 'child_process';
import { inspect } from 'util';
import { calulateTepmlateOptions, createFiles, transformOptions, validateOptions } from './helpers';
import { TurborepoGeneratorOptions } from './schema';

export async function turborepoGenerator(tree: Tree, options: TurborepoGeneratorOptions): Promise<any> {
  const logger = getLogger(options.runnerType);

  logger.debug('run turborepoGenerator with options:');
  logger.debug(inspect(options, true, null));

  const validatedOptions = validateOptions(options, logger);
  const transformedOptions = transformOptions(validatedOptions, logger);
  const calculatedTemplateOptions = calulateTepmlateOptions(validatedOptions, logger);
  const projectCwd = join(options.cwd, transformedOptions.nameT.fileName);

  createFiles(
    tree,
    transformedOptions.nameT.fileName,
    {
      ...validatedOptions,
      ...transformedOptions,
      ...calculatedTemplateOptions,
    },
    logger,
  );

  return async () => {
    if (!options.dryRun) {
      logger.debug('initilizing git repository');
      execSync('git init && git checkout -b main', {
        cwd: projectCwd,
        stdio: 'ignore',
      });

      logger.debug('installing dependencies');
      execSync('pnpm install', {
        cwd: projectCwd,
        stdio: 'inherit',
      });

      logger.debug('formatting');
      execSync('pnpm format', {
        cwd: projectCwd,
      });
    }
  };
}

export default turborepoGenerator;

export const turborepoSchematic = convertNxGenerator(turborepoGenerator);
