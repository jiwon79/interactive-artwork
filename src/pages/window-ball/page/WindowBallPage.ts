import { JElement } from '@core/element';
import { JParagraph } from '@core/primitives';

export class WindowBallPage extends JElement {
  constructor() {
    super();
  }

  connectedCallback() {
    super.connectedCallback();
  }

  createElements() {
    const title = new JParagraph({
      innerText: 'Window Ball',
    });

    this.append(title);
  }

  attributeChangedCallback() {
    super.attributeChangedCallback();
  }
}

customElements.define('window-ball-page', WindowBallPage);
