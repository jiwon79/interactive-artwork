import { JElement } from '@core/element';
import { JAnchor, JDiv, JParagraph } from '@core/primitives';

import styles from './MainPage.module.scss';

export class MainPage extends JElement<{}> {
  constructor() {
    super({});
  }

  createElements() {
    const title = new JParagraph({
      innerText: 'Interactive Artwork',
      className: styles.title,
    });

    const linkContainer = new JDiv();

    const mainLink = new JAnchor({
      href: '/',
      innerText: 'main',
      className: styles.link,
    });

    const solidTextLink = new JAnchor({
      href: '/solid-text',
      innerText: 'solid text',
      className: styles.link,
    });

    this.append(title);
    this.append(linkContainer);
    linkContainer.append(mainLink);
    linkContainer.append(solidTextLink);
  }
}

customElements.define('main-page', MainPage);
