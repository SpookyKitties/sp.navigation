// import * as lodash from 'lodash';
export class Navigation {
  public title: string;
  public shortTitle: string;
  public url: string;
  public _id: string = undefined;
  public navigation: Navigation[] = [];
  constructor(element: Element, id: string = undefined) {
    this._id = id;
    const tempElement = element.firstElementChild;
    const titleElement = tempElement.querySelector('.title');
    const shortTitleElement = tempElement.querySelector('.short-title');
    this.title = (titleElement ? titleElement.innerHTML : '').replace(
      `&nbsp;`,
      `\u00A0`,
    );
    this.shortTitle = (shortTitleElement
      ? shortTitleElement.innerHTML
      : ''
    ).replace(`&nbsp;`, `\u00A0`);
    if (
      tempElement.hasAttribute('href') &&
      tempElement.getAttribute('href').includes('#map')
    ) {
      this.url = undefined;
      Array.from(tempElement.nextElementSibling.children).forEach(
        childElement => {
          if (childElement) {
            this.navigation.push(new Navigation(childElement));
          }
        },
      );
      // console.log(this.navigation.length);
    } else {
      try {
        this.url = tempElement.getAttribute('href').replace('.html', '');
        this.navigation = undefined;
      } catch (error) {
        error = '';
        console.log(error);
        console.log(tempElement.outerHTML);
      }
    }
  }
}
