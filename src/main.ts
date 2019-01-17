import * as commander from 'commander';
// import * as fs from 'graceful-fs';
import * as path from 'path';

commander
  .version('0.1.0', '-v, --version')
  .option('-i, --input <cmd>', 'Input Source')
  .option('-o, --output <cmd>', 'Output File')
  .parse(process.argv);
export class Main {
  public run(input: string): void {
    console.log(path.resolve(input));
  }
}

const main = new Main();
// console.log(commander);

main.run(commander.input);
