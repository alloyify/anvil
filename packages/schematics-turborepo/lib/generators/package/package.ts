import { convertNxGenerator, getLogger, join, Tree } from '@alloyify/devkit';
import { createFiles, transformOptions, validateOptions } from './helpers';
import { PackageGeneratorOptions } from './schema';

export async function packageGenerator(tree: Tree, options: PackageGeneratorOptions): Promise<any> {
  const logger = getLogger(options.runnerType);

  logger.debug('run packageGenerator with options:');
  logger.debug(options);

  const validatedOptions = validateOptions(options, logger);
  const transformedOptions = transformOptions(validatedOptions, logger);

  createFiles(
    tree,
    join(validatedOptions.workspace, transformedOptions.packageNameT.fileName),
    {
      ...validatedOptions,
      ...transformedOptions,
    },
    logger,
  );

  return tree;
}

export default packageGenerator;

export const packageSchematic = convertNxGenerator(packageGenerator);
