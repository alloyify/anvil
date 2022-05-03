export const LOGGER_NAME = 'anvil';

export const GENERATE_COMMAND = 'genearate';

export enum NxSchematics {
  lib = 'lib',
  app = 'app',
}

export enum TurborepoSchematics {
  package = 'package',
}

export const NX_SCHEMATICS_LIST = Object.values(NxSchematics).join(', ');

export const TURBOREPO_SCHEMATICS_LIST = Object.values(TurborepoSchematics).join(', ');
