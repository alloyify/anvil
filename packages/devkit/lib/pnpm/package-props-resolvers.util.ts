import {
  PackageAccess,
  PackageRegistry,
  PACKAGE_ACCESS_CHOICES,
  PACKAGE_ACCESS_DEFAULT,
  PACKAGE_REGISTRY_CHOICES,
  PACKAGE_REGISTRY_DEFAULT,
} from '../constants';
import { AnvilConfigGeneratorsPackage } from '../interfaces';
import { Logger } from '../logger';

export function resolvePackageAccess(
  fromAnvilConfig: AnvilConfigGeneratorsPackage,
  access: PackageAccess,
  logger: Logger,
): PackageAccess {
  logger.debug('resolvePackageAccess');

  const providedAccess = access ?? fromAnvilConfig.access;
  const resolvedAccess = PACKAGE_ACCESS_CHOICES.find((one) => one === providedAccess);

  if (!resolvedAccess) {
    logger.debug(`package access "${resolvedAccess}" is not allowed. Resolving default "${PACKAGE_ACCESS_DEFAULT}"`);
    return PACKAGE_ACCESS_DEFAULT;
  }

  logger.debug(`package access "${resolvedAccess}"`);
  return resolvedAccess;
}

export function resolvePackageRegistry(
  fromAnvilConfig: AnvilConfigGeneratorsPackage,
  registry: PackageRegistry,
  logger: Logger,
): PackageRegistry {
  logger.debug('resolvePackageRegistry');

  const providedRegistry = registry ?? fromAnvilConfig.registry;
  const resolvedRegistry = PACKAGE_REGISTRY_CHOICES.find((one) => one === providedRegistry);

  if (!resolvedRegistry) {
    logger.debug(
      `package regustry "${resolvedRegistry}" is not allowed. Resolving default "${PACKAGE_REGISTRY_DEFAULT}"`,
    );
    return PACKAGE_REGISTRY_DEFAULT;
  }

  logger.debug(`package registry "${resolvedRegistry}"`);
  return resolvedRegistry;
}
