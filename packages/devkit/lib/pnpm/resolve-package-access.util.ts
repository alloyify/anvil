import { PackageAccess, PACKAGE_ACCESS_CHOICES, PACKAGE_ACCESS_DEFAULT } from '../constants';
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
