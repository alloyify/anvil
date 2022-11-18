import Ajv from 'ajv';
import { DOT_ANVIL_CONFIG } from '../constants';
import { DotAnvilConfig } from '../interfaces';
import { Logger } from '../logger';
import { loadJsonFile } from './json.loaders';
import { loadYamlFile } from './yaml.loaders';

export function validateDotAnvilConfig(dotAnvilConfig: DotAnvilConfig, logger: Logger): DotAnvilConfig {
  logger.debug('validateDotAnvilConfig');

  if (!dotAnvilConfig) {
    return undefined;
  }

  const ajv = new Ajv();

  const schema = {
    type: 'object',
    properties: {
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
    logger.error(`Invalid DotAnvil config: ${instancePath} ${message}`);
    process.exit(1);
  }

  return dotAnvilConfig;
}

export function loadDotAnvilConfig(cwd: string, logger: Logger): DotAnvilConfig {
  logger.debug('loadDotAnvilConfig');

  const config = loadJsonFile(cwd, DOT_ANVIL_CONFIG, logger) ?? loadYamlFile(cwd, DOT_ANVIL_CONFIG, logger);
  const validatedConfig = validateDotAnvilConfig(config as any, logger);

  return validatedConfig;
}
