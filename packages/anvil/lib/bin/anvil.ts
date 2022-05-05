#!/usr/bin/env node

import { loadCwdConfigs } from '@alloyify/devkit';
import { Command } from 'commander';
import { GenerateTurborepoCommand } from '../commands';
import { loadAnvilPackageJson, logger } from '../utils';

const cwdConfigs = loadCwdConfigs(process.cwd(), logger);
const packageJson = loadAnvilPackageJson();
const { version } = packageJson;

logger.info(`cli v${version}`);

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
