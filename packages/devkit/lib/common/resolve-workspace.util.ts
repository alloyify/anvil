import { loadPnpmYaml } from './yaml.loaders';

export function resolveWorkspace(cwd: string, workspace?: string) {
  const pnpmYaml = loadPnpmYaml(cwd);

  if (!pnpmYaml) {
    // TODO: add logging
    console.log('No PNPM workspace yaml found');
    process.exit(1);
  }
}
