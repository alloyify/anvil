import type { Tree } from 'nx/src/config/tree';
/**
 * Returns workspace defaults. It includes defaults folders for apps and libs,
 * and the default scope.
 *
 * Example:
 *
 * ```typescript
 * { appsDir: 'apps', libsDir: 'libs', npmScope: 'myorg' }
 * ```
 * @param tree - file system tree
 */
export declare function getWorkspaceLayout(tree: Tree): {
    appsDir: string;
    libsDir: string;
    standaloneAsDefault: boolean;
    npmScope: string;
};
export declare function getWorkspacePath(tree: Tree): '/angular.json' | '/workspace.json' | null;
