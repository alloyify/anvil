import * as inquirer from 'inquirer';
import { logger } from './logger';

export async function runPrompts<T = any>(questions: inquirer.Question[]): Promise<T> {
  if (questions.length) {
    const prompt = inquirer.createPromptModule();
    const answers = (await prompt(questions)
      .then((a) => a)
      .catch((e) => {
        logger.error('error while prompting options:');
        logger.error(e);
      })) as any;

    return answers;
  }

  return {} as any;
}
