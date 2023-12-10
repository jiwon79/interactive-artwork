import {
  addBaseEventsListener,
  BaseProps,
  initBaseAttribute,
  removeBaseEventsListener,
} from './BaseProps';

interface JLabelProp extends BaseProps {
  htmlFor?: string;
}

export class JLabel extends HTMLLabelElement {
  private readonly _props: JLabelProp;

  constructor(props: JLabelProp = {}) {
    super();
    this._props = props;
    initBaseAttribute(this, this._props);
    props.htmlFor && (this.htmlFor = props.htmlFor);
  }

  connectedCallback() {
    addBaseEventsListener(this, this._props);
  }

  disconnectedCallback() {
    removeBaseEventsListener(this, this._props);
  }
}

customElements.define('j-label', JLabel, { extends: 'label' });
