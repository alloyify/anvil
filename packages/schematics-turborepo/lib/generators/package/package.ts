import { convertNxGenerator, Tree } from '@alloyify/devkit';

export async function packageGenerator(tree: Tree, options: any): Promise<any> {
  console.log(options);

  console.log(tree);
  return tree;
}

export default packageGenerator;

export const packageSchematic = convertNxGenerator(packageGenerator);
