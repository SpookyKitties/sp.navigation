import * as fs from 'graceful-fs';
import * as path from 'path';

// tslint:disable-next-line:no-require-imports
import urlRegex = require('url-regex');
export class LinkExtractor {
  public extactFromFiles(inputPath: string): Promise<string[]> {
    console.log(inputPath);

    return new Promise<string[]>(
      (
        resolve: (resolveValue: string[]) => void,
        reject: (rejectValue: string[]) => void,
      ) => {
        fs.stat(
          path.resolve(inputPath),
          (err: NodeJS.ErrnoException, stats: fs.Stats) => {
            if (err) {
              reject([err.message]);
            } else {
              console.log(stats);
              resolve(['asdf', 'asdfasdweqr']);
            }
          },
        );
      },
    );
  }

  public extractFromUrl(url: string): string[] {
    console.log('test');
    // tslint:disable-next-line:no-require-imports
    // const urlRegex = require('url-regex');
    if (urlRegex().test('www.github.com ')) {
      console.log(url);
    }

    return [];
  }
}
