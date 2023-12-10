import {
  addBaseEventsListener,
  BaseProps,
  initBaseAttribute,
  removeBaseEventsListener,
} from './BaseProps';

interface JParagraphProp extends BaseProps {}

export class JParagraph extends HTMLParagraphElement {
  private readonly _props: JParagraphProp;

  constructor(props: JParagraphProp = {}) {
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

customElements.define('j-paragraph', JParagraph, { extends: 'p' });
