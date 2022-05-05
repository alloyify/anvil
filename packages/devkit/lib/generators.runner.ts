import type { Generator } from '@nrwl/devkit';
import { FileChange, FsTree, printChanges } from '@nrwl/tao/src/shared/tree';
import { writeFileSync, ensureDirSync, removeSync, chmodSync } from 'fs-extra';
import { isFunction } from 'lodash';
import { dirname, join } from 'path';
import { GeneratorsRunnerType } from './constants';
import { GeneratorsRunnerOptions } from './interfaces';

export class GeneratorsRunner {
  protected options: GeneratorsRunnerOptions;

  constructor(options: GeneratorsRunnerOptions) {
    this.options = {
      cwd: options.cwd,
      type: GeneratorsRunnerType.ALLOYIFY,
      dryRun: false,
      printChanges: true,
      ...options,
    };
  }

  public async execute<T = unknown>(
    generator: Generator<T>,
    generatorOptions: T,
    options?: Omit<GeneratorsRunnerOptions, 'cwd'>,
  ): Promise<void> {
    const host = new FsTree(this.options.cwd, false);
    const task: any = await generator(host, {
      ...generatorOptions,
      dryRun: (generatorOptions as any).dryRun ?? this.options.dryRun,
      type: (generatorOptions as any).type ?? this.options.type,
    });
    const changes = host.listChanges();

    if (options?.printChanges || this.options.printChanges) {
      printChanges(changes);
    }

    if (!options?.dryRun || !this.options.dryRun) {
      this.applyChanges(changes);
    }

    if (isFunction(task)) {
      await task();
    }
  }

  protected applyChanges(fileChanges: FileChange[]): void {
    fileChanges.forEach((f) => {
      const fpath = join(this.options.cwd, f.path);
      if (f.type === 'CREATE') {
        ensureDirSync(dirname(fpath));
        writeFileSync(fpath, f.content);
        if (f.options?.mode) chmodSync(fpath, f.options.mode);
      } else if (f.type === 'UPDATE') {
        writeFileSync(fpath, f.content);
        if (f.options?.mode) chmodSync(fpath, f.options.mode);
      } else if (f.type === 'DELETE') {
        removeSync(fpath);
      }
    });
  }
}
