import './style.scss';
import { JElement } from '@core/element';

export class MainPage extends JElement<{}, {}> {
  constructor() {
    super({}, {});
  }

  createElements() {
    const title = document.createElement('p');
    title.classList.add('title');
    title.innerText = 'Interactive Artwork';

    const linkContainer = document.createElement('div');

    const mainLink = document.createElement('a');
    mainLink.href = '/';
    mainLink.innerText = 'main';

    const solidTextLink = document.createElement('a');
    solidTextLink.href = '/solid-text';
    solidTextLink.innerText = 'solid text';

    this.append(title);
    linkContainer.append(mainLink);
    linkContainer.append(solidTextLink);
    this.append(linkContainer);
  }
}

customElements.define('main-page', MainPage);
