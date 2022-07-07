#!/usr/bin/env node

import { CwdType, loadCwdConfigs } from '@alloyify/devkit';
import { Command } from 'commander';
import {
  GenerateNxAppCommand,
  GenerateNxWorkspaceCommand,
  GenerateTurborepoPackageCommand,
  GenerateTurborepoCommand,
} from '../commands';
import { loadAnvilPackageJson, logger } from '../utils';

const cwd = process.cwd();

logger.debug(`CWD ${cwd}`);

const cwdConfigs = loadCwdConfigs(cwd, logger);
const packageJson = loadAnvilPackageJson(logger);
const { version } = packageJson;
logger.info(`v${version}`);

const program = new Command();

switch (cwdConfigs.cwdType) {
  case CwdType.EMPTY:
    GenerateNxWorkspaceCommand.load(program);
    GenerateTurborepoCommand.load(program);
    break;

  case CwdType.NX:
    GenerateNxAppCommand.load(program);
    break;

  case CwdType.TURBOREPO:
    GenerateTurborepoPackageCommand.load(program, cwdConfigs);
    break;

  case CwdType.NOT_MONOREPO:
    break;

  default:
    break;
}

program.version(version);
program.parse(process.argv);
