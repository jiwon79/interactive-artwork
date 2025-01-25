import { JElement } from '@core/element';
import { JAnchor, JDiv, JParagraph } from '@core/primitives';

import styles from './MainPage.module.scss';

export class MainPage extends JElement {
  constructor() {
    super();
  }

  createElements() {
    const title = new JParagraph({
      innerText: 'Interactive Artwork',
      className: styles.title,
    });

    const linkContainer = new JDiv();

    const links: { href: string; innerText: string }[] = [
      { href: '/', innerText: 'main' },
      { href: '/solid-text', innerText: 'solid text' },
      { href: '/wave-grid', innerText: 'wave grid' },
    ];

    this.append(title);
    this.append(linkContainer);
    links.forEach((link) => {
      const anchor = new JAnchor({
        href: link.href,
        innerText: link.innerText,
        className: styles.link,
      });
      linkContainer.append(anchor);
    });
  }
}

customElements.define('main-page', MainPage);
