export function loadAnvilPackageJson(path?: string): Record<string, any> {
  return require(path ?? '../../package.json');
}
