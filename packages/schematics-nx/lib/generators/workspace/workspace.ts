import { convertNxGenerator, getLogger, join, Tree } from '@alloyify/devkit';
import { execSync } from 'child_process';
import { inspect } from 'util';
import { createFiles, transformOptions, validateOptions } from './helpers';
import { WorkspaceGeneratorOptions } from './schema';

export async function workspaceGenerator(tree: Tree, options: WorkspaceGeneratorOptions): Promise<any> {
  const logger = getLogger(options.runnerType);

  logger.debug('run workspaceGenerator with options:');
  logger.debug(inspect(options, true, null));

  const validatedOptions = validateOptions(options, logger);
  const transformedOptions = transformOptions(validatedOptions, logger);
  const projectCwd = join(options.cwd, transformedOptions.nameT.fileName);

  createFiles(
    tree,
    transformedOptions.nameT.fileName,
    {
      ...validatedOptions,
      ...transformedOptions,
    },
    logger,
  );

  return async () => {
    logger.info('initilizing git repository');
    execSync('git init && git checkout -b main', {
      cwd: projectCwd,
    });

    // logger.info('installing dependencies');
    // execSync('pnpm install', {
    //   cwd: projectCwd,
    //   stdio: 'inherit',
    // });

    // logger.info('formatting');
    // execSync('pnpm format', {
    //   cwd: projectCwd,
    // });
  };
}

export default workspaceGenerator;

export const workspaceSchematics = convertNxGenerator(workspaceGenerator);
