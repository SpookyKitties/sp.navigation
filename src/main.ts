import * as fs from 'graceful-fs';
import * as path from 'path';
import { JSDOM } from 'jsdom';
import { Navigation } from './navigation';
export class Main {
  private manifests = './nav_files';
  public async run(): Promise<void> {
    const files = await this.getFileContent();
    const navigation = await this.processFiles(files);
    console.log(`Test ${navigation.length}`);
    
    fs.writeFileSync(path.resolve('./test.json'), JSON.stringify(navigation));

  }

  private processFiles(files: Buffer[]) {
    return new Promise<Navigation[]>(resolve => {
      let navigation: Navigation[] = [];
      files.forEach(file => {
        const jsdom = new JSDOM(file);
        
  
        jsdom.window.document
          .querySelectorAll('nav.manifest > .doc-map > li')
          .forEach(li => {
        console.log(jsdom.window.document.querySelector('title').innerHTML);
            navigation.push( new Navigation(li))
          });
      });

      resolve(navigation);
    });
  }
  private getFileContent(): Promise<Buffer[]> {
    return new Promise<Buffer[]>(resolve => {
      let buffers: Buffer[] = [];
      fs.readdir(
        path.resolve(this.manifests),
        (err: NodeJS.ErrnoException, files: string[]) => {
          if (err) {
            console.log(err);
          } else {
            files.forEach(file => {
              // console.log(file);
              buffers.push(
                fs.readFileSync(`${path.resolve(this.manifests)}\\${file}`),
              );
              console.log(buffers.length);
            });
            console.log(buffers.length);

            resolve(buffers);
          }
        },
      );
    });
  }
}

const main = new Main();

main.run();
// console.log(commander);
