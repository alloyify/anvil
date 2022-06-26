import Ajv from 'ajv';
import deepMerge from 'ts-deepmerge';
import { ANVIL_CONFIG, PACKAGE_ACCESS_DEFAULT, PACKAGE_LICENSE_DEFAULT, PACKAGE_REGISTRY_DEFAULT } from '../constants';
import { AnvilConfig } from '../interfaces';
import { Logger } from '../logger';
import { loadJsonFile } from './json.loaders';
import { loadYamlFile } from './yaml.loaders';

const defaultConfig: AnvilConfig = {
  generators: {
    package: {
      scope: '',
      access: PACKAGE_ACCESS_DEFAULT,
      registry: PACKAGE_REGISTRY_DEFAULT,
      license: PACKAGE_LICENSE_DEFAULT,
      author: {
        name: '',
        email: '',
      },
    },
  },
};

export function mergeAnvilConfig(anvilConfig: AnvilConfig, logger: Logger): AnvilConfig {
  logger.debug('mergeAnvilConfig');

  return deepMerge(defaultConfig, anvilConfig);
}

export function validateAnvilConfig(anvilConfig: AnvilConfig, logger: Logger): AnvilConfig {
  logger.debug('validateAnvilConfig');

  if (!anvilConfig) {
    return {};
  }

  const ajv = new Ajv();

  const schema = {
    type: 'object',
    properties: {
      generators: {
        type: 'object',
        properties: {
          package: {
            type: 'object',
            properties: {
              scope: { type: 'string' },
              access: { type: 'string' },
              license: { type: 'string' },
              registry: { type: 'string' },
              author: {
                type: 'object',
                properties: {
                  name: { type: 'string' },
                  email: { type: 'string' },
                },
                additionalProperties: false,
              },
            },
            additionalProperties: false,
          },
        },
        additionalProperties: false,
      },
    },
    additionalProperties: false,
  };

  const validate = ajv.compile<AnvilConfig>(schema);
  const isValid = validate(anvilConfig);

  if (!isValid) {
    const { instancePath, message } = validate.errors[0];
    logger.error(`Invalid Anvil config: ${instancePath} ${message}`);
    process.exit(1);
  }

  return anvilConfig;
}

export function loadAnvilConfig(cwd: string, logger: Logger): AnvilConfig {
  logger.debug('loadAnvilConfig');

  const config = loadJsonFile(cwd, ANVIL_CONFIG, logger) ?? loadYamlFile(cwd, ANVIL_CONFIG, logger);
  const validatedConfig = validateAnvilConfig(config ?? {}, logger);

  return mergeAnvilConfig(validatedConfig, logger);
}
