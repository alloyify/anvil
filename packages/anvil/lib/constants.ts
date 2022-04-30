export const ANVIL = 'anvil';

export const GENERATE_COMMAND = 'genearate';

export const NX_SCHEMATICS: Record<string, string> = {
  lib: 'lib',
  app: 'app',
};

export const TURBOREPO_SCHEMATICS: Record<string, string> = {
  package: 'package',
};

export const NX_SCHEMATICS_LIST = Object.values(NX_SCHEMATICS).join(', ');

export const TURBOREPO_SCHEMATICS_LIST = Object.values(TURBOREPO_SCHEMATICS).join(', ');
