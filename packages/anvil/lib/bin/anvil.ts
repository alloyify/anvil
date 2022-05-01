#!/usr/bin/env node

import { logger, resolveSpaceType } from '@alloyify/devkit';
import { Command } from 'commander';
import { GenerateTurborepoCommand } from '../commands';
import { loadAnvilPackageJson } from '../utils';

const spaceType = resolveSpaceType();
const packageJson = loadAnvilPackageJson();
const { version } = packageJson;
logger.notice('cli', `v${version}`);

const program = new Command();

switch (spaceType) {
  case 'empty':
    break;

  case 'nx':
    break;

  case 'turborepo':
    GenerateTurborepoCommand.load(program);
    break;

  case 'not-monorepo':
    break;

  default:
    break;
}

program.version(version);
program.parse(process.argv);
