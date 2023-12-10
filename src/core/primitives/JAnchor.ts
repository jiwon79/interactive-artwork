import {
  addBaseEventsListener,
  BaseProps,
  initBaseAttribute,
  removeBaseEventsListener,
} from './BaseProps';

interface JAnchorProps extends BaseProps {
  href?: string;
}

export class JAnchor extends HTMLAnchorElement {
  private readonly _props: JAnchorProps;

  constructor(props: JAnchorProps = {}) {
    super();
    this._props = props;
    initBaseAttribute(this, this._props);
    props.href && (this.href = props.href);
  }

  connectedCallback() {
    addBaseEventsListener(this, this._props);
  }

  disconnectedCallback() {
    removeBaseEventsListener(this, this._props);
  }
}

customElements.define('j-anchor', JAnchor, { extends: 'a' });
