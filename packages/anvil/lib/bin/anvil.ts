#!/usr/bin/env node

import { loadCwdConfigs } from '@alloyify/devkit';
import { Command } from 'commander';
import { GenerateTurborepoCommand } from '../commands';
import { loadAnvilPackageJson, logger } from '../utils';

const cwd = process.cwd();

logger.debug(`CWD ${cwd}`);

const cwdConfigs = loadCwdConfigs(cwd, logger);
const packageJson = loadAnvilPackageJson(logger);
const { version } = packageJson;
const program = new Command();

switch (cwdConfigs.cwdType) {
  case 'empty':
    break;

  case 'nx':
    break;

  case 'turborepo':
    GenerateTurborepoCommand.load(program, cwdConfigs);
    break;

  case 'not-monorepo':
    break;

  default:
    break;
}

program.version(version);
program.parse(process.argv);
