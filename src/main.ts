import * as commander from 'commander';
import { LinkExtractor } from './LinkExtractor';

commander
  .version('0.1.0', '-v, --version')
  .option('-f, --folder <cmd>', 'Folder')
  .option('-o, --output <cmd>', 'Output File')
  .option('-u, --url <cmd>', 'Url')
  .parse(process.argv);
export class Main {
  public run(
    inputPath: string = '',
    url: string = '',
    outputPath: string,
  ): void {
    const linkExtractor = new LinkExtractor();
    console.log(inputPath);

    let output: string[] = [];
    linkExtractor
      .extactFromFiles(inputPath)
      .then((value: string[]) => {
        output = output.concat(value);
        console.log(value);
      })
      .catch((value: string[]) => {
        console.log(value);
      });

    output = output.concat(linkExtractor.extractFromUrl(url));

    console.log(outputPath);
    console.log(output);
  }
}

const main = new Main();
// console.log(commander);

main.run(commander.folder, commander.url, commander.output);
