import {
  addDependencies,
  convertNxGenerator,
  getLogger,
  getPathFromLayout,
  ALLOYIFY_NPM_DEPS,
  NPM_DEPS,
  Tree,
} from '@alloyify/devkit';
import { execSync } from 'child_process';
import { inspect } from 'util';
import { ApplicationType } from './constants';
import {
  cleanAfterGenerators,
  createFiles,
  generateNodeApplication,
  transformOptions,
  validateOptions,
  updateProjectWorkspaceJson,
} from './helpers';
import { ApplicationGeneratorOptions } from './schema';

export async function applicationGenerator(tree: Tree, options: ApplicationGeneratorOptions): Promise<any> {
  const logger = getLogger(options.runnerType);

  logger.debug('run applicationGenerator with options:');
  logger.debug(inspect(options, true, null));

  const validatedOptions = validateOptions(options, logger);
  const transformedOptions = transformOptions(validatedOptions, logger);
  const appPath = getPathFromLayout(tree, transformedOptions.directoryName, 'appsDir', logger);
  const depsToInstall = [
    ALLOYIFY_NPM_DEPS.CONFIG,
    NPM_DEPS.NESTJS_COMMON,
    NPM_DEPS.NESTJS_CORE,
    NPM_DEPS.NESTJS_CONFIG,
    NPM_DEPS.REFLECT_METADATA,
    NPM_DEPS.RXJS,
  ];

  switch (options.type) {
    case ApplicationType.HTTP:
      depsToInstall.push(NPM_DEPS.NESTJS_PATFORM_EXPRESS);
      break;

    case ApplicationType.MICROSERVICE:
      depsToInstall.push(NPM_DEPS.NESTJS_MICROSERVICES);
      depsToInstall.push(NPM_DEPS.NATS);
      depsToInstall.push(ALLOYIFY_NPM_DEPS.MICROSERVICES);
      break;

    case ApplicationType.HYBRID:
      depsToInstall.push(NPM_DEPS.NESTJS_PATFORM_EXPRESS);
      depsToInstall.push(NPM_DEPS.NESTJS_MICROSERVICES);
      depsToInstall.push(NPM_DEPS.NATS);
      depsToInstall.push(ALLOYIFY_NPM_DEPS.MICROSERVICES);
      break;

    default:
      break;
  }

  await generateNodeApplication(tree, transformedOptions);
  createFiles(
    tree,
    appPath,
    {
      ...validatedOptions,
      ...transformedOptions,
    },
    logger,
  );
  addDependencies(tree, depsToInstall, [], logger);
  updateProjectWorkspaceJson(tree, transformedOptions.nameT.fileName);
  cleanAfterGenerators(tree, appPath);

  return async () => {
    if (!options.dryRun) {
      logger.debug('installing dependencies');
      execSync('pnpm install', {
        cwd: options.cwd,
        stdio: 'inherit',
      });

      logger.debug('formatting');
      execSync('pnpm format', {
        cwd: options.cwd,
      });
    }
  };
}

export default applicationGenerator;

export const applicationSchematics = convertNxGenerator(applicationGenerator);
