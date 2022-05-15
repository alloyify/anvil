import { convertNxGenerator, getLogger, Tree } from '@alloyify/devkit';
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

  return tree;
}

export default turborepoGenerator;

export const turborepoSchematic = convertNxGenerator(turborepoGenerator);