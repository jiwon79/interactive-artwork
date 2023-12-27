import {
  addBaseEventsListener,
  BaseProps,
  initBaseAttribute,
  removeBaseEventsListener,
} from './BaseProps';

interface JButtonProps extends BaseProps {}

export class JButton extends HTMLButtonElement {
  private readonly _props: JButtonProps;

  constructor(props: JButtonProps = {}) {
    super();
    this._props = props;
    initBaseAttribute(this, this._props);
  }

  connectedCallback() {
    addBaseEventsListener(this, this._props);
  }

  disconnectedCallback() {
    removeBaseEventsListener(this, this._props);
  }
}

customElements.define('j-button', JButton, { extends: 'button' });
