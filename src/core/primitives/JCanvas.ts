import {
  addBaseEventsListener,
  BaseProps,
  initBaseAttribute,
  removeBaseEventsListener,
} from './BaseProps';

interface JCanvasProps extends BaseProps {
  width?: number;
  height?: number;
}

export class JCanvas extends HTMLCanvasElement {
  private readonly _props: JCanvasProps;

  constructor(props: JCanvasProps = {}) {
    super();
    this._props = props;
    initBaseAttribute(this, this._props);
    props.width && (this.width = props.width);
    props.height && (this.height = props.height);
  }

  connectedCallback() {
    addBaseEventsListener(this, this._props);
  }

  disconnectedCallback() {
    removeBaseEventsListener(this, this._props);
  }
}

customElements.define('j-canvas', JCanvas, { extends: 'canvas' });
