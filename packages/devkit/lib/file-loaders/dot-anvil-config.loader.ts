import Ajv from 'ajv';
import deepMerge from 'ts-deepmerge';
import {
  DOT_ANVIL_CONFIG,
  PACKAGE_ACCESS_DEFAULT,
  PACKAGE_LICENSE_DEFAULT,
  PACKAGE_REGISTRY_DEFAULT,
} from '../constants';
import { DotAnvilConfig } from '../interfaces';
import { Logger } from '../logger';
import { loadJsonFile } from './json.loaders';
import { loadYamlFile } from './yaml.loaders';

const defaultConfig: DotAnvilConfig = {
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

export function validateDotAnvilConfig(dotAnvilConfig: DotAnvilConfig, logger: Logger): DotAnvilConfig {
  logger.debug('validateDotAnvilConfig');

  if (!dotAnvilConfig) {
    return undefined;
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
      digest: {
        type: 'object',
        properties: {
          targets: {
            type: 'array',
            minItems: 0,
            items: {
              type: 'object',
              properties: {
                name: { type: 'string' },
                path: { type: 'string' },
                type: { type: 'string' },
              },
              required: ['name', 'path', 'type'],
              additionalProperties: false,
            },
          },
          packages: {
            type: 'array',
            minItems: 0,
            items: {
              type: 'object',
              properties: {
                name: { type: 'string' },
                targets: {
                  type: 'array',
                  minItems: 0,
                  items: { type: 'string' },
                },
              },
              required: ['name', 'targets'],
              additionalProperties: false,
            },
          },
        },
        additionalProperties: false,
      },
    },
    additionalProperties: false,
  };

  const validate = ajv.compile<DotAnvilConfig>(schema);
  const isValid = validate(dotAnvilConfig);

  if (!isValid) {
    const { instancePath, message } = validate.errors[0];
    logger.error(`Invalid .anvil config: ${instancePath} ${message}`);
    process.exit(1);
  }

  return dotAnvilConfig;
}

export function mergeDotAnvilConfig(dotAnvilConfig: DotAnvilConfig, logger: Logger): DotAnvilConfig {
  logger.debug('mergeDotAnvilConfig');

  return deepMerge(defaultConfig, dotAnvilConfig);
}

export function loadDotAnvilConfig(cwd: string, logger: Logger): DotAnvilConfig {
  logger.debug('loadDotAnvilConfig');

  const config = loadJsonFile(cwd, DOT_ANVIL_CONFIG, logger) ?? loadYamlFile(cwd, DOT_ANVIL_CONFIG, logger);
  const validatedConfig = validateDotAnvilConfig(config as any, logger);

  return mergeDotAnvilConfig(validatedConfig, logger);
}
