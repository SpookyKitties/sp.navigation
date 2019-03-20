// import * as lodash from 'lodash';
import * as he from 'he';
import { INavigation } from './INavigation';
import { JSDOM } from 'jsdom';

export class TopNavigation implements INavigation {
  title: string;
  shortTitle: string;
  url: string;
  _id: string;
  navigation: Navigation[] = [];

  public newNavigation(
    element: Element,
    id: string,
    jsdom: JSDOM,
  ): Promise<void> {
    return new Promise<void>(resolve => {
      this._id = id;
      // const tempElement = element.firstElementChild;
      const titleElement = element.querySelector('#title1');
      const shortTitleElement = element.querySelector('#title1');
      this.title = he.decode(titleElement ? titleElement.innerHTML : '');
      this.shortTitle = he.decode(
        shortTitleElement ? shortTitleElement.innerHTML : '',
      );

      jsdom.window.document
        .querySelectorAll(
          'nav.manifest > .doc-map > li, nav.manifest > section',
        )
        .forEach(li => {
          // console.log(jsdom.window.document.querySelector('title').innerHTML);
          // const id = `navigation-${jsdom.window.document
          //   .querySelector('html')
          //   .getAttribute('data-aid')}`;
          // console.log(id);

          this.navigation.push(new Navigation(li, id));
        });
      resolve();
    });
  }
}
export class Navigation implements INavigation {
  public title: string;
  public shortTitle: string;
  public url: string;
  public _id: string = undefined;
  public navigation: Navigation[] = [];

  constructor(element: Element, id: string = undefined) {
    this._id = id;
    const tempElement = element.firstElementChild;
    const titleElement = element.querySelector('.title');
    const shortTitleElement = element.querySelector('.short-title');
    this.title = he.decode(titleElement ? titleElement.innerHTML : '');
    this.shortTitle = he.decode(
      shortTitleElement ? shortTitleElement.innerHTML : '',
    );
    const section =
      tempElement.id === 'intro' || tempElement.classList.contains('title');

    if (
      (tempElement.hasAttribute('href') &&
        tempElement.getAttribute('href').includes('map')) ||
      section
    ) {
      this.url = undefined;

      // if (section) {
      //   console.log(Array.from(tempElement.nextElementSibling.children).length);
      // }
      // if (element.id === 'sec1') {
      //   console.log(this._id);
      // }

      // const children = section
      //   ? tempElement.nextElementSibling.children
      //   : tempElement.nextElementSibling.children;
      const docMap = element.querySelector('.doc-map');
      if (docMap) {
        Array.from(docMap.children).forEach(childElement => {
          if (childElement) {
            this.navigation.push(new Navigation(childElement));
          }
        });
      }
      // console.log(this.navigation.length);
    } else {
      try {
        this.url = tempElement.getAttribute('href').replace('.html', '');
        this.navigation = undefined;
      } catch (error) {
        error = '';
        console.log(error);
        // console.log(tempElement.outerHTML);
      }
    }
  }
}
