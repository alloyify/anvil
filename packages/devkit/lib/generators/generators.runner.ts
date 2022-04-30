import type { Generator } from '@nrwl/devkit';
import { FileChange, FsTree } from '@nrwl/tao/src/shared/tree';
import { writeFileSync, ensureDirSync, removeSync, chmodSync } from 'fs-extra';
import { isFunction } from 'lodash';
import { dirname, join } from 'path';

export class GeneratorsRunner {
  constructor(protected cwd: string) {}

  public async execute<T = unknown>(generator: Generator<T>, generatorOptions: T): Promise<void> {
    const host = new FsTree(this.cwd, false);
    const task: any = await generator(host, generatorOptions);
    const changes = host.listChanges();
    this.applyChanges(changes);

    if (isFunction(task)) {
      await task();
    }
  }

  protected applyChanges(fileChanges: FileChange[]): void {
    fileChanges.forEach((f) => {
      const fpath = join(this.cwd, f.path);
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
