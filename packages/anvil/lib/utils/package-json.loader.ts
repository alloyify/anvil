import { Logger, PACKAGE_JSON } from '@alloyify/devkit';

export function loadAnvilPackageJson(logger: Logger): Record<string, any> {
  logger.debug(`loading Anvil's ${PACKAGE_JSON}`);

  return require(`../../${PACKAGE_JSON}`);
}
