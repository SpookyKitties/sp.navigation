import * as fs from 'graceful-fs';
import * as path from 'path';
// import * as pouchdb from 'pouchdb';
import { JSDOM } from 'jsdom';
import { Navigation, TopNavigation } from './navigation';
import { INavigation } from './INavigation';
export class Main {
  private manifests = './base_manifest_files';
  public async run(): Promise<void> {
    // const db = new pouchdb('https://couch.parkinson.im/navigation');

    const files = await this.getFileContent();
    const navigation = await this.processFiles(files);
    console.log(`Test ${navigation.length}`);

    fs.writeFileSync(path.resolve('./navigation.json'), JSON.stringify(navigation));

    // db.bulkDocs(navigation);
  }

  private processFiles(files: Buffer[]) {
    return new Promise<Navigation[]>(resolve => {
      let navigation: INavigation[] = [];
      files.forEach(async file => {
        const jsdom = new JSDOM(file);
        const header = jsdom.window.document.querySelector('header');

        const id = `navigation-${jsdom.window.document
          .querySelector('html')
          .getAttribute('data-aid')}`;
        console.log(header.innerHTML);
        const topNavigation = new TopNavigation();
        await topNavigation.newNavigation(header, id, jsdom);

        navigation.push(topNavigation);
        // jsdom.window.document
        //   .querySelectorAll('nav.manifest > .doc-map > li')
        //   .forEach(li => {
        //     // console.log(jsdom.window.document.querySelector('title').innerHTML);
        //     const id = `navigation-${jsdom.window.document
        //       .querySelector('html')
        //       .getAttribute('data-aid')}`;
        //     // console.log(id);

        //     navigation.push(new Navigation(li, id));
        //   });
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

              if (
                fs
                  .lstatSync(`${path.resolve(this.manifests)}\\${file}`)
                  .isFile()
              ) {
                buffers.push(
                  fs.readFileSync(`${path.resolve(this.manifests)}\\${file}`),
                );
              }

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
