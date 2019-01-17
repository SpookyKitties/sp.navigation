export class Main {
  public async exec(): Promise<void> {
    return new Promise<void>(
      (
        resolve: (resolveValue: void) => void,
        reject: (rejectValue: void) => void,
      ) => {
        resolve(undefined);
        reject(undefined);
      },
    );
  }
}

async function exec() {
  const main = new Main();

  await main.exec();
}

exec();
