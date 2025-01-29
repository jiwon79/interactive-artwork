import {
  addBaseEventsListener,
  BaseProps,
  initBaseAttribute,
  removeBaseEventsListener,
} from './BaseProps';

interface JDivProps extends BaseProps {
  children?: HTMLElement[];
}

export class JDiv extends HTMLDivElement {
  private readonly _props: JDivProps;

  constructor(props: JDivProps = {}) {
    super();
    this._props = props;
    initBaseAttribute(this, this._props);
    if (props.children) {
      props.children.forEach((child) => this.append(child));
    }
  }

  connectedCallback() {
    addBaseEventsListener(this, this._props);
  }

  disconnectedCallback() {
    removeBaseEventsListener(this, this._props);
  }
}

customElements.define('j-div', JDiv, { extends: 'div' });
